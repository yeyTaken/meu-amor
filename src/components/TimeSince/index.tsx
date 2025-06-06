"use client";

import React, { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';

interface TimeSinceProps {
  startDate: string; // exemplo: '2025-03-18T00:00:00'
}

const formatDuration = (startDate: string): string => {
  const start = new Date(startDate);
  const now = new Date();

  const duration = intervalToDuration({ start, end: now });

  const { months, days, hours, minutes, seconds } = duration;

  return `${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
};

const TimeSince: React.FC<TimeSinceProps> = ({ startDate }) => {
  const [timeDiff, setTimeDiff] = useState<string>(formatDuration(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(formatDuration(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return timeDiff;
};

export default TimeSince;
