import Highcharts from "highcharts";

const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    //Filtering channels that have messages for more than one date

    const getChannelsWithMoreDates = channels.filter((channel) => {
      return messageCountList.some(
        (message) => message.channelId === channel.value
      );
    });

    //Grouping messages by channelId
    const groupedMessagesById = messageCountList.reduce((acc, message) => {
      if (!acc[message.channelId]) {
        acc[message.channelId] = [];
      }
      acc[message.channelId].push(message);
      return acc;
    }, {});

    // Creating data series for each channel (x and y co-ordinates)
    const dataSeries = getChannelsWithMoreDates.map((channel) => {
      const channelId = channel.value;
      const channelMessages = groupedMessagesById[channelId];
      const data = channelMessages.map((message) => {
        return {
          x: new Date(message.timeBucket).getTime(),
          y: parseInt(message.count),
        };
      });

      return {
        name: channel.name,
        data,
        channelId,
      };
    });

    //Generating Highcharts options

    const options = {
      chart: {
        type: "spline",
        backgroundColor: "#1d1d1d",
      },
      title: {
        text: "Assignment - Mercle",
        style: {
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
        },
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date",
          style: {
            color: "#fff",
          },
        },
        labels: {
          style: {
            color: "#fff",
          },
        },
      },
      yAxis: {
        title: {
          text: "Message Count",
          style: {
            color: "#fff",
          },
        },
        labels: {
          style: {
            color: "#fff",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderColor: "#ccc",
        style: {
          color: "#333",
        },
        formatter: function () {
          const channelName = this.series.name;
          const messageCount = this.y;
          const date = Highcharts.dateFormat("%Y-%m-%d", this.x);
          return `<b>${channelName}</b><br/>Count: ${messageCount}<br/>Date: ${date}`;
        },
      },
      series: dataSeries,
    };
    return options;
  },
};

export default engagementHelper;
