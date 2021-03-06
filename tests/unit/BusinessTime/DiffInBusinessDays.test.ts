import moment = require("moment")
import { BusinessTime } from "../../../src"
import { TEST_FORMAT } from "../../index"

describe("getting difference in business days", () => {
    test.each([
        // Going forward in time midnight to midnight.
        ["Monday 2018-05-14 00:00", "Monday 2018-05-14 00:00", 0],
        ["Monday 2018-05-14 00:00", "Tuesday 2018-05-15 00:00", 1],
        ["Monday 2018-05-14 00:00", "Wednesday 2018-05-16 00:00", 2],
        ["Monday 2018-05-14 00:00", "Thursday 2018-05-17 00:00", 3],
        ["Monday 2018-05-14 00:00", "Friday 2018-05-18 00:00", 4],
        ["Monday 2018-05-14 00:00", "Saturday 2018-05-19 00:00", 5],
        ["Monday 2018-05-14 00:00", "Sunday 2018-05-20 00:00", 5],
        // Going forward in time with specific hours.
        ["Friday 2018-05-18 17:00", "Saturday 2018-05-19 17:00", 0],
        ["Friday 2018-05-18 15:00", "Saturday 2018-05-19 17:00", 0],
        ["Monday 2018-05-14 00:00", "Monday 2018-05-14 13:00", 0],
        ["Monday 2018-05-14 08:00", "Monday 2018-05-14 13:00", 0],
        ["Monday 2018-05-14 09:00", "Monday 2018-05-14 13:00", 0],
        ["Monday 2018-05-14 13:00", "Monday 2018-05-14 17:00", 0],
        ["Monday 2018-05-14 09:00", "Tuesday 2018-05-15 13:00", 1],
        ["Monday 2018-05-14 09:00", "Friday 2018-05-18 13:00", 4],
        ["Monday 2018-05-14 09:00", "Friday 2018-05-18 17:00", 5],
        ["Monday 2018-05-14 09:00", "Friday 2018-05-18 19:00", 5],
        ["Monday 2018-05-14 09:00", "Saturday 2018-05-19 07:00", 5],
        ["Monday 2018-05-14 09:00", "Sunday 2018-05-20 13:00", 5],
        ["Monday 2018-05-14 09:00", "Wednesday 2018-05-30 16:00", 12],
        // Going back in time midnight to midnight.
        ["Monday 2018-05-14 00:00", "Monday 2018-05-07 00:00", 5],
        ["Monday 2018-05-14 00:00", "Tuesday 2018-05-08 00:00", 4],
        ["Monday 2018-05-14 00:00", "Wednesday 2018-05-09 00:00", 3],
        ["Monday 2018-05-14 00:00", "Thursday 2018-05-10 00:00", 2],
        ["Monday 2018-05-14 00:00", "Friday 2018-05-11 00:00", 1],
        ["Monday 2018-05-14 00:00", "Saturday 2018-05-12 00:00", 0],
        ["Monday 2018-05-14 00:00", "Sunday 2018-05-13 00:00", 0],
        // Going back in time with specific hours.
        ["Monday 2018-05-14 09:00", "Monday 2018-05-07 09:00", 5],
        ["Monday 2018-05-14 17:00", "Monday 2018-05-07 09:00", 6],
        ["Monday 2018-05-14 17:00", "Monday 2018-05-07 13:00", 5],
        ["Monday 2018-05-14 10:00", "Tuesday 2018-05-08 12:00", 3],
        ["Monday 2018-05-14 11:00", "Wednesday 2018-05-09 13:00", 2],
        ["Monday 2018-05-14 17:00", "Thursday 2018-05-10 13:00", 2],
        ["Monday 2018-05-14 15:00", "Friday 2018-05-11 09:00", 1],
        ["Monday 2018-05-14 13:00", "Saturday 2018-05-12 13:00", 0],
        ["Monday 2018-05-14 18:00", "Sunday 2018-05-13 01:00", 1],
    ])(
        "diff in business days default",
        (day: string, otherDay: string, expectedDiff: number) => {
            // Given we have a business time for a particular day;
            const businessTime = new BusinessTime(moment.utc(day, TEST_FORMAT))

            // When we get the diff in business days from another day;
            const diff = businessTime.diffInBusinessDays(
                moment.utc(otherDay, TEST_FORMAT),
            )

            // Then we should get the expected diff.
            expect(diff).toEqual(expectedDiff)
        },
    )

    test.each([
        // Going forward in time midnight to midnight.
        ["Monday", "Monday", 0.0],
        ["Monday 2018-05-14 00:00", "Tuesday 2018-05-15 00:00", 1.0],
        ["Monday 2018-05-14 00:00", "Wednesday 2018-05-16 00:00", 2.0],
        ["Monday 2018-05-14 00:00", "Thursday 2018-05-17 00:00", 3.0],
        ["Monday 2018-05-14 00:00", "Friday 2018-05-18 00:00", 4.0],
        ["Monday 2018-05-14 00:00", "Saturday 2018-05-19 00:00", 5.0],
        ["Monday 2018-05-14 00:00", "Sunday 2018-05-20 00:00", 5.0],
        ["Friday 2018-05-18 00:00", "Saturday 2018-05-19 00:00", 1.0],
        // Going forward in time with specific hours.
        ["Friday 2018-05-18 17:00", "Saturday 2018-05-19 17:00", 0.0],
        ["Friday 2018-05-18 15:00", "Saturday 2018-05-19 17:00", 0.25],
        ["Monday 2018-05-14 00:00", "Monday 2018-05-14 13:00", 0.5],
        ["Monday 2018-05-14 08:00", "Monday 2018-05-14 13:00", 0.5],
        ["Monday 2018-05-14 09:00", "Monday 2018-05-14 13:00", 0.5],
        ["Monday 2018-05-14 13:00", "Monday 2018-05-14 17:00", 0.5],
        ["Monday 2018-05-14 09:00", "Tuesday 2018-05-15 13:00", 1.5],
        ["Monday 2018-05-14 09:00", "Friday 2018-05-18 13:00", 4.5],
        ["Monday 2018-05-14 09:00", "Friday 2018-05-18 17:00", 5.0],
        ["Monday 2018-05-14 09:00", "Friday 2018-05-18 18:00", 5.0],
        ["Monday 2018-05-14 09:00", "Saturday 2018-05-19 13:00", 5.0],
        ["Monday 2018-05-14 09:00", "Sunday 2018-05-20 13:00", 5.0],
        ["Monday 2018-05-14 09:00", "Monday 2018-06-04 17:00", 16.0],
        // Going back in time midnight to midnight.
        ["Monday 2018-05-14 00:00", "Monday 2018-05-07 00:00", 5.0],
        ["Monday 2018-05-14 00:00", "Tuesday 2018-05-08 00:00", 4.0],
        ["Monday 2018-05-14 00:00", "Wednesday 2018-05-09 00:00", 3.0],
        ["Monday 2018-05-14 00:00", "Thursday 2018-05-10 00:00", 2.0],
        ["Monday 2018-05-14 00:00", "Friday 2018-05-11 00:00", 1.0],
        ["Monday 2018-05-14 00:00", "Saturday 2018-05-12 00:00", 0.0],
        ["Monday 2018-05-14 00:00", "Sunday 2018-05-13 00:00", 0.0],
        // Going back in time with specific hours.
        ["Monday 2018-05-14 09:00", "Monday 2018-05-07 09:00", 5.0],
        ["Monday 2018-05-14 17:00", "Monday 2018-05-07 09:00", 6.0],
        ["Monday 2018-05-14 17:00", "Monday 2018-05-07 13:00", 5.5],
        ["Monday 2018-05-14 10:00", "Tuesday 2018-05-08 12:00", 3.75],
        ["Monday 2018-05-14 11:00", "Wednesday 2018-05-09 13:00", 2.75],
        ["Monday 2018-05-14 17:00", "Thursday 2018-05-10 13:00", 2.5],
        ["Monday 2018-05-14 15:00", "Friday 2018-05-11 09:00", 1.75],
        ["Monday 2018-05-14 13:00", "Saturday 2018-05-12 13:00", 0.5],
        ["Monday 2018-05-14 18:00", "Sunday 2018-05-13 01:00", 1.0],
    ])(
        "diff in partial business days default",
        (time: string, otherTime: string, expectedDiff: number) => {
            // Given we have a business time for a particular time;
            const businessTime = new BusinessTime(moment.utc(time, TEST_FORMAT))

            // When we get the diff in partial business days from another time;
            const diff = businessTime.diffInPartialBusinessDays(
                moment.utc(otherTime, TEST_FORMAT),
            )

            // Then we should get the expected diff.
            expect(diff).toEqual(expectedDiff)
        },
    )
})
