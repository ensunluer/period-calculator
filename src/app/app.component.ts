import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    now = new Date();
    inputTime = `${this.now.getHours()}:${this.now.getMinutes()}`;
    periods: { period: string, workTime: string, breakTime: string }[] = [];

    calculatePeriods() {
        let [hour, minute] = this.inputTime.split(':').map(Number);
        const newPeriods: { period: string, workTime: string, breakTime: string }[] = [];

        for (let j = 1; j <= 3; j++) {
            for (let i = 1; i <= 4; i++) {
                let endHour = hour;
                let endMinute = minute + (i === 4 ? 30 : 25);

                if (endMinute >= 60) {
                    endMinute = endMinute - 60;
                    endHour++;
                }

                let workTime = `${hour}:${minute < 10 ? '0' + minute : minute} - ${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`;

                if (i < 4) {
                    minute = endMinute;
                    endMinute += 5;
                    if (endMinute >= 60) {
                        endMinute = endMinute - 60;
                        endHour++;
                    }
                    let breakTime = `${hour}:${minute < 10 ? '0' + minute : minute} - ${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`;

                    newPeriods.push({
                        period: `Q${i} (Round ${j})`,
                        workTime,
                        breakTime
                    });
                } else {
                    newPeriods.push({
                        period: `Q${i} (Round ${j})`,
                        workTime,
                        breakTime: ''
                    });
                }

                hour = endHour;
                minute = endMinute;
                if (minute >= 60) {
                    minute = minute - 60;
                    hour++;
                }
            }

            let endHour = hour;
            let endMinute = minute + 30;

            if (endMinute >= 60) {
                endMinute = endMinute - 60;
                endHour++;
            }
            let longBreakTime = `${hour}:${minute < 10 ? '0' + minute : minute} - ${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`;

            newPeriods.push({
                period: `Long Break (After Round ${j})`,
                workTime: longBreakTime,
                breakTime: ''
            });

            hour = endHour;
            minute = endMinute;
            if (minute >= 60) {
                minute = minute - 60;
                hour++;
            }
        }

        this.periods = newPeriods;
    }
}
