import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";
import { Data } from "./Data";

const EngagementMessagesOverTime = () => {
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    Data.messageCountList,
    Data.channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
