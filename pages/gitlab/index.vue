<template>
    <div>
        Start date: {{startDate}} End date: {{endDate}}
        <br/>
        <template v-for="(team, indexTeam) in teams">
            <div style="display: inline-block; vertical-align: top; text-align: left;">
                {{team.name}} Среднее время = {{team.sum}} часа
                <template v-for="(mr, indexMr) in team.mrs">
                    <br/>Номер: {{mr.iid}}, Изменений: {{mr.changes}}, Автор: {{mr.assignee}}, Время: {{mr.time}} {{mr.measure}}.
                </template>
            </div>
        </template>
        <br/>
        <div>Количество измененных файлов:</div>
        <template v-for="(member, indexTeam) in members">
            <div>Автор {{member.name}} - {{member.count}} измененных файлов, {{member.discussion}} - дискуссий</div>
        </template>
    </div>
</template>

<script>
    import axios from '~/plugins/axios';
    import DateUtils from '~/services/DateUtils';

    async function loadTeamData (startDate, endDate, team) {
        const { data } = await axios.get(`https://gitlab.lmru.adeo.com/api/v4/merge_requests?state=merged&scope=all&created_after=${startDate}&created_before=${endDate}&target_branch=${team}&private_token=_sYbMvzTEMiso2ctkByb`);
        let sum = 0;
        const mrs = [];
        for (const d of data) {
            const resp = await axios.get(`https://gitlab.lmru.adeo.com/api/v4/projects/234/merge_requests/${d.iid}?private_token=_sYbMvzTEMiso2ctkByb`);
            const resp2 = await axios.get(`https://gitlab.lmru.adeo.com/api/v4/projects/234/merge_requests/${d.iid}/discussions?private_token=_sYbMvzTEMiso2ctkByb`);
            let number = DateUtils.workingMinutesBetweenDates(new Date(d.created_at), new Date(d.updated_at));
            sum += number;
            let measure = 'минут';
            if (number > 540) {
                number = number / 60 / 9;
                measure = 'рабочих дней';
            } else if (number > 60) {
                number = number / 60;
                measure = 'часов';
            }
            let disc = 0;
            resp2.data.forEach(r => {
               r.notes.forEach(note => {
                   if (note.resolvable) {
                       disc++;
                   }
               });
            });

            mrs.push({
                iid: d.iid,
                time: (number + '').slice(0, 3),
                measure: measure,
                changesCount: d.changes_count,
                assignee: resp.data.author.name,
                changes: resp.data.changes_count,
                discussion: disc,
            });
        }
        sum = (((sum / data.length) / 60) + '').slice(0, 3);
        return {
            name: team,
            sum: sum,
            mrs: mrs
        };
    }

    export default {
        async asyncData () {
            const startDate = '2018-09-01';
            const endDate = '2018-09-30';
            // const startDate = '2018-10-01';
            // const endDate = '2018-10-30';
            const teams = [];
            teams.push(await loadTeamData(startDate, endDate, 'fteam_account'));
            // teams.push(await loadTeamData(startDate, endDate, 'develop'));
            const members = [];
            teams.forEach(t => {
               t.mrs.forEach(mr => {
                  let member = members.find(m => {
                      return m.name === mr.assignee;
                  });
                  if (member === undefined) {
                      members.push({
                          name: mr.assignee,
                          count: Number(mr.changes),
                          discussion: mr.discussion,
                      });
                  } else {
                      member.count = member.count + Number(mr.changes);
                      member.discussion = member.discussion + Number(mr.discussion);
                  }
               });
            });
            return { teams: teams, startDate: startDate, endDate: endDate, members: members };
        }
    };
</script>
