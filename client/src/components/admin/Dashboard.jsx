import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  useUserslistMutation,
  useSubscriptionListMutation,
} from "../../slices/adminApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [usersAPI] = useUserslistMutation();
  const [SubcribtionsAPI] = useSubscriptionListMutation();
  const [chartData, setchartData] = useState(null);
  const [pieChartData, setpieChartData] = useState([]);
  const [dashboardData, setdashboardData] = useState({});
  const [noOfUsers, setNoofUsers] = useState(null);
  const [noofSubscribers, setnoOfSubscribers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminInfo) {
      navigate("/admins/login");
    }
    const getChartData = async () => {
      const mockChartData = [
        { name: "sun", revenue: 0 },
        { name: "mon", revenue: 0 },
        { name: "tue", revenue: 0 },
        { name: "wed", revenue: 0 },
        { name: "thu", revenue: 0 },
        { name: "fri", revenue: 0 },
        { name: "sat", revenue: 0 },
      ];

      const mockPieChartData = [
        { name: "Users", value: noOfUsers },
        { name: "Subscribe", value: noofSubscribers },
      ];

      const mockDashboardData = {
        totalUsers: 100,
      };

      setchartData(mockChartData);
      setpieChartData(mockPieChartData);
      setdashboardData(mockDashboardData);
    };
    getChartData();
  }, [noOfUsers, noofSubscribers]);

  useEffect(() => {
    getUsersData();
  }, [dashboardData, noOfUsers, noofSubscribers]);

  const getUsersData = async () => {
    usersAPI()
      .unwrap()
      .then((data) => {
        const userList = data.users.length;
        setNoofUsers(userList);
      })
      .catch((err) => {
        console.log("error ", err);
        throw err;
      });
    SubcribtionsAPI()
      .unwrap()
      .then((data) => {
        const subsribersList = data?.subscriptions?.length;
        setchartDatas(data);
        setnoOfSubscribers(subsribersList);
      })
      .catch((err) => {
        throw err;
      });
  };
  const setchartDatas = async (response) => {
    const mockChartData = [
      { name: "sun", revenue: 0 },
      { name: "mon", revenue: 0 },
      { name: "tue", revenue: 0 },
      { name: "wed", revenue: 0 },
      { name: "thu", revenue: 0 },
      { name: "fri", revenue: 0 },
      { name: "sat", revenue: 0 },
    ];
    const today = new Date().getDay();

    const startDay = (today + 1) % 7;
    const endDay = today;

    const subscriptions = response.subscriptions.filter((subscription) => {
      const createdAt = new Date(subscription.createdAt);
      const createdAtDay = createdAt.getDay();
      return createdAtDay >= startDay && createdAtDay <= endDay;
    });

    for (let i = startDay; i <= endDay; i++) {
      const dayName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][i];
      const dayRevenue = subscriptions.reduce((totalRevenue, subscription) => {
        const createdAt = new Date(subscription.createdAt);
        const createdAtDay = createdAt.getDay();
        if (createdAtDay === i) {
          return totalRevenue + subscription.amount;
        }
        return totalRevenue;
      }, 0);
      const chartDataItem = mockChartData.find((item) => item.name === dayName);
      if (chartDataItem) {
        chartDataItem.revenue = dayRevenue;
      }
    }
  };

  const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div className="w-[81.5%] h-fit mx-auto my-[2.5rem] bg-gray-100 py-6  drop-shadow-lg">
        {!chartData || !pieChartData || !dashboardData ? (
          <>
            <div className="pr-4 mx-5 w-full text-center">
              <span>Loading</span>
            </div>
          </>
        ) : (
          <>
            <div className="w-[95%] mx-auto md:h-fit h-fit md:grid-cols-3  md:gap-8 grid  gap-5 ">
              <div className="bg-blue-700  rounded-3xl md:grid-cols-1 grid grid-rows-5 gap-1 drop-shadow-xl">
                <div className=" row-span-2 flex items-center px-3">
                  <h1 className="text-2xl font-medium text-white">
                    Total Users
                  </h1>
                </div>
                <div className=" row-span-3 flex items-center justify-end">
                  <h1 className="text-8xl px-2 text-white">{noOfUsers}</h1>
                </div>
              </div>

              <div className="bg-green-600 rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
                <div className=" row-span-2 flex items-center px-3">
                  <h1 className="text-2xl font-medium text-white">
                    Active Subscriptions
                  </h1>
                </div>
                <div className=" row-span-3 flex items-center justify-end">
                  <h1 className="text-8xl px-2  text-white">
                    {noofSubscribers}
                  </h1>
                </div>
              </div>

              <div className="bg-green-950  rounded-3xl grid grid-rows-5 gap-1 drop-shadow-xl">
                <div className=" row-span-2 flex items-center px-3">
                  <h1 className="text-2xl font-medium text-white">
                    Total Revenue
                  </h1>
                </div>
                <div className=" row-span-3 flex items-center justify-end">
                  <h1 className="text-8xl px-2  text-white">
                    {noofSubscribers * 1999}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-16 md:grid-cols-2 md:gap-8 grid">
              <div>
                <h1 className="pl-8 mb-8 font-bold">REVENUE</h1>
                {chartData && (
                  <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                  </LineChart>
                )}
              </div>
              <div>
                <h1 className="font-bold ml-28">PAYMENTS VS USERS</h1>
                {pieChartData && (
                  <PieChart width={400} height={220}>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                )}
                <div className="flex gap-5">
                  <h1 className="text-yellow-700 ml-32">Users</h1>
                  <h1 className="text-blue-700">Subcribers</h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
