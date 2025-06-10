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

  const parts = [
    { value: duration.years, unit: 'ano', plural: 'anos' },
    { value: duration.months, unit: 'mês', plural: 'meses' },
    { value: duration.days, unit: 'dia', plural: 'dias' },
    { value: duration.hours, unit: 'hora', plural: 'horas' },
    { value: duration.minutes, unit: 'minuto', plural: 'minutos' },
    { value: duration.seconds, unit: 'segundo', plural: 'segundos' },
  ]
    .filter(({ value }) => value !== undefined && value !== 0)
    .map(({ value, unit, plural }) => `${value} ${value === 1 ? unit : plural}`);

  if (parts.length === 0) return '0 segundos';
  if (parts.length === 1) return parts[0];

  const lastPart = parts.pop();
  return `${parts.join(', ')} e ${lastPart}`;
};

export const TimeSince: React.FC<TimeSinceProps> = ({ startDate }) => {
  const [timeDiff, setTimeDiff] = useState<string>(() => formatDuration(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDiff(formatDuration(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return <span>{timeDiff}</span>;
};