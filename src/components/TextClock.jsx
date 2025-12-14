import { useEffect, useState } from "react";

function timeToText() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    const periods = hours >= 12 ? "PM" : "AM";

    hours %= 12; // setting a 12 hours system
    hours = hours === 0 ? 12 : hours // if the above result is 0 the hours is 12

    const hoursText = numbers[hours]; // return index of numbers in hours

    const minutesText = minutes === 0
        ? "O'CLOCK" : // at 0 minutes it should return o'clock
        minutes < 10
            ? `OH ${numbers[minutes]}` // less than ten return O minutes 
            : numbers[minutes];

    let time = [];
    if (minutes === 0 && hours === 12) {
        time = { bigText: "TWELVE NOON", smallText: "", period: "" };
    } else if (minutes === 15) {
        time = { bigText: "QUARTER PAST", smallText: hoursText, period: periods };
    } else if (minutes === 30) {
        time = { bigText: "HALF PAST", smallText: hoursText, period: periods };
    } else if (minutes === 45) {
        time = { bigText: `QUARTER TO ${numbers[(hours % 12) + 1]}`, smallText: "", period: periods };
    } else {
        time = { bigText: hoursText, smallText: minutesText, period: periods };
    }
    return time;
}

const numbers = [
    "TWELVE", "ONE", "TWO", "THREE", "FOUR", "FIVE",
    "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN",
    "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN",
    "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY", "TWENTY-ONE",
    "TWENTY-TWO", "TWENTY-THREE", "TWENTY-FOUR", "TWENTY-FIVE",
    "TWENTY-SIX", "TWENTY-SEVEN", "TWENTY-EIGHT", "TWENTY-NINE",
    "THIRTY", "THIRTY-ONE", "THIRTY-TWO", "THIRTY-THREE", "THIRTY-FOUR",
    "THIRTY-FIVE", "THIRTY-SIX", "THIRTY-SEVEN", "THIRTY-EIGHT",
    "THIRTY-NINE", "FORTY", "FORTY-ONE", "FORTY-TWO", "FORTY-THREE",
    "FORTY-FOUR", "FORTY-FIVE", "FORTY-SIX", "FORTY-SEVEN",
    "FORTY-EIGHT", "FORTY-NINE", "FIFTY", "FIFTY-ONE", "FIFTY-TWO", "FIFTY-THREE",
    "FIFTY-FOUR", "FIFTY-FIVE", "FIFTY-SIX", "FIFTY-SEVEN", "FIFTY-EIGHT",
    "FIFTY-NINE"];

function TextClock() {

    const [time, setTime] = useState(timeToText());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(timeToText())
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    return (
        <div key={time.bigText} className="w-full mb-8 flex justify-center animate-fadeSlide">
            <div className="px-6 py-4  rounded-xl 
                bg-gradient-to-br from-gray-50 to-gray-100
                border border-gray-200
                shadown-sm text-center flex gap-2 flex-row items-end justify-center">
                <div>
                    <p className="text-4xl font-semibold">{time.bigText}</p>
                    <p className="font-semibold text-lg">{time.smallText}</p>
                </div>
                <p >{time.period}</p>
            </div>
        </div>
    )
};
export default TextClock