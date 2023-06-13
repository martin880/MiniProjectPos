import React, { useState } from "react";
import {
  Flex,
  SimpleGrid,
  Text,
  Box,
  Icon,
  Stack,
  HStack,
  VStack,
  Input,
  Center,
} from "@chakra-ui/react";
import {
  AreaChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Area,
  Tooltip,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
  Cell,
} from "recharts";
import SideBar from "../components/SideBar";
import TopBarAdmin from "../components/TopBarAdmin";
import { BsArrowUpRight } from "react-icons/bs";
import SideBarAdmin from "../components/SideBarAdmin";
import { useEffect } from "react";
import { api } from "../api/api";

const ReportPages = () => {
  const [chartData, setChartData] = useState([
    {
      name: "",
      uv: "",
      pv: "",
      amt: "",
    },
  ]);
  const [chartData2, setChartData2] = useState([
    {
      name: "",
      value: 0,
    },
  ]);
  const [date, setDate] = useState({
    DateFrom: "2020-12-12 00:00:00",
    DateTo: new Date(),
  });
  useEffect(() => {
    const tempOrder = [];
    const tempOrder2 = [];
    api.post("/product/sold", date).then((res) => {
      console.log(res.data);
      console.log(new Date());
      setChartData([]);
      let qty = 0;
      res.data?.map((val) => {
        const Orders = val.OrderDetails;
        Orders?.map((val) => {
          qty = val.quantity + qty;
          return qty;
        });
        tempOrder.push({
          name: val.productname,
          Total_Sales: val.harga * qty,
          Qty_Sales: qty,
          amt: "",
        });
        setChartData(tempOrder);
        console.log([
          {
            name: val.productname,
            uv: val.harga,
            pv: qty,
            amt: "",
          },
        ]);
        qty = 0;
      });
    });
    api
      .post("/product/sold", date)
      .then((res) => {
        console.log(res.data);
        let qty2 = 0;
        setChartData2([]);
        res.data?.map((val) => {
          const Orders2 = val.OrderDetails;
          Orders2?.map((val) => {
            qty2 = val.quantity + qty2;
            return qty2;
          });
          tempOrder2.push({
            name: val.productname,
            value: val.harga * qty2,
          });
          setChartData2(tempOrder2);
          console.log([
            {
              name: val.productname,
              uv: val.harga,
              pv: qty2,
              amt: "",
            },
          ]);
          qty2 = 0;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [date]);
  //   useEffect(() => {
  //     api
  //       .get(`/auth/v5?search_query=${keyword}`)
  //       .then((response) => {
  //         setUsers(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, [keyword]);

  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 10000,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : Rp.${payload[0].value.toLocaleString(
            "id-ID"
          )}`}</label>
        </div>
      );
    }
    return null;
  };
  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];

  const samsung = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const post = [
    {
      id: 1,
      title: "Gross Sale",
      price: "8.999.999",
      gross: "9.10",
    },
    {
      id: 2,
      title: "Gross Sale",
      price: "8.999.999",
      gross: "9.10",
    },
    {
      id: 3,
      title: "Gross Sale",
      price: "8.999.999",
      gross: "9.10",
    },
    {
      id: 4,
      title: "Gross Sale",
      price: "8.999.999",
      gross: "9.10",
    },
  ];
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...date };
    tempobject[id] = value;
    setDate(tempobject);
    console.log(tempobject);
  }
  return (
    <>
      <Flex className="container">
        <Flex className="device" bg={"whitesmoke"}>
          <Flex className="sidebar">
            <SideBarAdmin />
          </Flex>
          <Flex w={"80%"} h={"100%"} flexDir={"column"} gap={"10px"}>
            <Flex className="topbar">
              <TopBarAdmin />
            </Flex>
            <Flex gap={"20px"} pl={"20px"} pr={"20px"}>
              <Flex flexDir={"column"} w={"100%"}>
                Date From
                <Input
                  bgColor={"blackAlpha.300"}
                  variant={"filled"}
                  type="date"
                  id="DateFrom"
                  placeholder="Date From"
                  onChange={inputHandler}
                ></Input>
              </Flex>
              <Flex flexDir={"column"} w={"100%"}>
                Date To
                <Input
                  bgColor={"blackAlpha.300"}
                  variant={"filled"}
                  type="date"
                  id="DateTo"
                  placeholder="Date To"
                  onChange={inputHandler}
                ></Input>
              </Flex>
            </Flex>
            <SimpleGrid minChildWidth="120px" spacing="30px" p={4}>
              {post.map((post) => (
                <Box
                  key={post.id}
                  border={"1px solid black"}
                  borderRadius={"10px"}
                  height="80px"
                >
                  <Flex>
                    <Text
                      fontSize={"10px"}
                      p={3}
                      color={"gray"}
                      fontFamily={"serif"}
                      fontWeight={"medium"}
                    >
                      {post.title}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text
                      fontSize={"14px"}
                      p={3}
                      color={"black"}
                      fontFamily={"sans-serif"}
                      fontWeight={"bold"}
                    >
                      {post.price}
                    </Text>
                    <Flex flexDir={"column"}>
                      <Text
                        fontSize={"8px"}
                        p={4}
                        color={"green"}
                        fontFamily={"sans-serif"}
                        fontWeight={"bold"}
                      >
                        {post.gross}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
            <SimpleGrid columns={2} spacingX="20px" spacingY="20px" p={4}>
              <Stack>
                <HStack gap={"20px"}>
                  <Box
                    border={"1px solid black"}
                    borderRadius={"10px"}
                    height="50vh"
                    w={"39vw"}
                  >
                    <Flex>
                      <Text
                        fontSize={"10px"}
                        p={4}
                        color={"gray"}
                        fontFamily={"serif"}
                        fontWeight={"medium"}
                      >
                        Day of the Week Gross Sales Amount
                      </Text>
                    </Flex>
                    {chartData.length ? (
                      <AreaChart
                        width={550}
                        height={250}
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8884d8"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorPv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#82ca9d"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#82ca9d"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>

                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="Total_Sales"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                        />
                        <Area
                          type="monotone"
                          dataKey="Qty_Sales"
                          stroke="#82ca9d"
                          fillOpacity={1}
                          fill="url(#colorPv)"
                        />
                      </AreaChart>
                    ) : (
                      <Center width={550} height={250} textAlign={"center"}>
                        NO DATA{" "}
                      </Center>
                    )}
                  </Box>
                  <Box
                    border={"1px solid black"}
                    borderRadius={"10px"}
                    height="50vh"
                    w={"39vw"}
                  >
                    <Flex w={"30vw"} justifyContent={"center"}>
                      {chartData2.length ? (
                        <PieChart width={330} height={300}>
                          <Pie
                            data={chartData2}
                            color="#000000"
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                          >
                            {chartData2.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                        </PieChart>
                      ) : (
                        <Center width={330} height={300} textAlign={"center"}>
                          NO DATA{" "}
                        </Center>
                      )}
                    </Flex>
                  </Box>
                </HStack>
              </Stack>
            </SimpleGrid>
            <SimpleGrid pl={"15px"}>
              <Box
                border={"1px solid black"}
                borderRadius={"10px"}
                w={"1070px"}
              >
                <LineChart
                  width={1070}
                  height={250}
                  data={samsung}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </Box>
            </SimpleGrid>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ReportPages;
