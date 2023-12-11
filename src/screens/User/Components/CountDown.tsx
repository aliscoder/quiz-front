import { Column, TextNormal, TextTiny, TextTitle } from "@components";
import { HStack } from "native-base";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import pallete from "../../../../src/utils/theme/pallete";

type Props = {
  start: number;
  now: number;
  onEnd: () => void;
};

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const CountDown = (props: Props) => {
  const timerProps = {
    isPlaying: true,
    strokeWidth: 8,
  };

  const renderTime = (dimension: any, time: any) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };
  const getTimeSeconds = (time: any) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time: any) =>
    ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time: any) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time: any) => (time / daySeconds) | 0;
  const [endTime1, setEndTime1] = useState(false);
  const [decriment, setDecriment] = useState(props.start - props.now);
  const stratTime = props.now;
  const endTime = props.start;
  const interval = () => {
    setEndTime1(false);
    let timer = props.start - props.now;

    const myInterval = setInterval(function () {
      if (timer > 0) {
        timer -= 1;
        // setDecriment(timer);
      } else {
        timer = 0;
        clearInterval(myInterval);
        setEndTime1(true);
        props.onEnd();
      }
    }, 1000);
  };

  useEffect(() => {
    interval();
  }, []);

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);

  return (
    <Column alignItems="center">
      <CountdownCircleTimer
        {...timerProps}
        // @ts-ignore
        colors={pallete.secondary}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        size={120}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
          delay: 1.5,
        })}
      >
        {({ elapsedTime, color }) => (
          <Column alignItems="center">
            <TextTitle color="text.secondary">
              {renderTime("", getTimeHours(daySeconds - elapsedTime))}
            </TextTitle>
            <TextTitle color="text.secondary">ساعت</TextTitle>
          </Column>
        )}
      </CountdownCircleTimer>{" "}
      <HStack space={3} alignItems="center">
        <CountdownCircleTimer
          {...timerProps}
          //   @ts-ignore
          colors={pallete.secondary}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          size={120}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > 0,
          })}
        >
          {({ elapsedTime, color }) => (
            <Column alignItems="center">
              <TextTitle color="text.secondary">
                {renderTime("", getTimeSeconds(elapsedTime))}
              </TextTitle>
              <TextTitle color="text.secondary">ثانیه</TextTitle>
            </Column>
          )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          //   @ts-ignore
          colors={pallete.secondary}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          size={120}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <Column alignItems="center">
              <TextTitle color="text.secondary">
                {renderTime("", getTimeMinutes(hourSeconds - elapsedTime))}
              </TextTitle>
              <TextTitle color="text.secondary">دقیقه</TextTitle>
            </Column>
          )}
        </CountdownCircleTimer>
      </HStack>
    </Column>
  );
};

export default CountDown;
