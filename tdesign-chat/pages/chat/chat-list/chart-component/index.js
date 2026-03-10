import * as echarts from '../ec-canvas/echarts';

function onInitNormalLine(opt) {
  console.log('content item:', opt);

  const data = opt.data.options;
  const normalLineOption = {
    xAxis: data.xAxis,
    yAxis: data.yAxis,
    series: [
      {
        data: data.series[0].data,
        type: 'line',
      },
    ],
  };

  return (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width,
      height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);

    chart.setOption(normalLineOption);
    return chart;
  };
}

Component({
  data: {
    ec: null,
  },

  properties: {
    options: {
      type: Object,
    },
  },

  lifetimes: {
    attached() {
      this.setData({
        ec: {
          onInit: onInitNormalLine(this.properties.options),
        },
      });
    },
  },
});
