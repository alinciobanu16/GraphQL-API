import './App.css';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import useMeasure from 'react-use-measure';
import useFetch from './utils/useFetch';
import { months } from './utils/constants';

const margin = 32;
const defaultWidth = 100;
const defaultHeight = 100;

function App() {
  const { postsPerMonth, loading, error } = useFetch();
  const [ref, bounds] = useMeasure();
  const width = bounds.width / 1.3 || defaultWidth;
  const height = bounds.height / 1.3 || defaultHeight;
  const innerWidth = width - margin * 2;
  const innerHeight = (height - margin * 2) / 2.2;

  const xScale = scaleBand({
    range: [margin, innerWidth],
    domain: months,
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [innerHeight, margin / 2],
    domain: [
      Math.min(...Object.values(postsPerMonth)) - 1,
      Math.max(...Object.values(postsPerMonth)) + 1,
    ],
  });

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const BarGraph = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
      <>
        <svg
          ref={ref}
          width={'100%'}
          height={'100%'}
          viewBox={`0 0 ${width} ${height}`}
        >
          <Group>
            {!isEmpty(postsPerMonth) &&
              months.map((month, index) => {
                const barWidth = xScale.bandwidth();
                const barHeight = innerHeight - yScale(postsPerMonth[month]);
                const barX = xScale(month);
                const barY = innerHeight - barHeight;

                return (
                  <>
                    <Bar
                      key={`bar-${month}`}
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill="#6C38D2"
                    />

                    <text
                      key={index}
                      x={barX}
                      y={barY}
                      fill="black"
                      fontSize={0.01 * width}
                      width={barWidth}
                      height={barHeight}
                      dx={'-.2em'}
                      dy={'-.33em'}
                      style={{ fontFamily: 'arial', fontWeight: 'bold' }}
                    >
                      {`Nr. of posts: ${postsPerMonth[month]}`}
                    </text>
                  </>
                );
              })}
          </Group>

          <Group>
            <AxisBottom top={innerHeight} scale={xScale}></AxisBottom>
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
      <h2 style={{ textAlign: 'center' }}>My first Apollo app 🚀</h2>
      <br />
      <BarGraph />
    </div>
  );
}

export default App;
