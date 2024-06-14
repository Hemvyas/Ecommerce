import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background: teal;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
`;
const Offer = styled.div`
  @media (max-width: 420px) {
    font-size: 13px;
  }
  @media (max-width: 385px) {
    font-size: 12px;
  }
  @media (max-width: 350px) {
    font-size: 10px;
    font-weight:700;
  }
`;

const Announcement = () => {
  const calculateTimeLeft = () => {
    const endTime = new Date("2024-07-26T23:59:59");
    const now = new Date();
    const difference = endTime.getTime() - now.getTime();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <Container>
      <Offer>
        Flash Sale! Limited time offer ends in
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </Offer>
    </Container>
  );
};

export default Announcement;
