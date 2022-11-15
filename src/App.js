import './App.css';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import useMeasure from 'react-use-measure';
import useFetch from './utils/useFetch';
import { months } from './utils/constants';

function App() {
  const { postsPerMonth, loading, error } = useFetch();

  const [ref, bounds] = useMeasure();
  const margin = 32;
  const defaultWidth = 100;
  const defaultHeight = 100;

  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  const xScale = scaleBand({
    range: [margin, innerWidth],
    domain: months,
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [innerHeight / 2, margin / 2],
    domain: [
      Math.min(...Object.values(postsPerMonth)) - 1,
      Math.max(...Object.values(postsPerMonth)) + 1,
    ],
  });

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const BarGraph = () => {
    console.log(height);
    console.log(width);
    console.log(postsPerMonth);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
      <>
        <svg
          ref={ref}
          width={'100%'}
          height={'100%'}
          viewBox={`0 0 ${width} ${height}`}
          style={{ margin: 'auto' }}
        >
          <Group>
            {!isEmpty(postsPerMonth) &&
              months.map((month) => {
                const barWidth = xScale.bandwidth();
                const barHeight =
                  Number(innerHeight / 2 - yScale(postsPerMonth[month])) ?? 0;
                const barX = xScale(month);
                const barY = innerHeight / 2 - barHeight;

                return (
                  <Bar
                    key={`bar-${month}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="orange"
                  />
                );
              })}
          </Group>

          <Group>
            <AxisBottom top={innerHeight / 2} scale={xScale}></AxisBottom>
          </Group>

          <Group>
            <AxisLeft left={margin} scale={yScale}></AxisLeft>
          </Group>
        </svg>
      </>
    );
  };

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <BarGraph />
    </div>
  );
}

export default App;
