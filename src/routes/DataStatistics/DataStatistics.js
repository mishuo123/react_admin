/*
 * @Author: HuangJu
 * @Project: GZC
 * @DevTeam: Wireless Development Team
 * @Date: 2019-05-30 18:18:36
 * @LastEditors: Others
 * @LastEditTime: 2019-06-25 21:26:46
 * @Version: 1.0.0
 * @Description: 
 */

import React from "react";
import {
  Chart, Geom, Axis, Tooltip, Coord, Label, Legend,
  // G2, View, Guide, Shape, Facet, Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class DataStatistics extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: "待他签",
        count: 30
      },
      {
        item: "已完成",
        count: 30
      },
      {
        item: "未发起",
        count: 40
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    return (
      <PageHeaderLayout>
          <div style={{overflowX: 'auto',width: '100%'}}>
            <div style={{float: 'left',width: '50%'}}>
              <Chart
                  height={window.innerHeight/2.4}
                  data={dv}
                  scale={cols}
                  padding={[20, 180, 20, 0]}
                  // forceFit
                  >
                  <Coord type="theta" radius={0.75} />
                  <Axis name="percent" />
                  <Legend
                      position="right"
                      offsetY={-window.innerHeight / 4 + 100}
                      offsetX={20}
                  />
                  <Tooltip
                      showTitle={false}
                      itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                  />
                  <Geom
                      type="intervalStack"
                      position="percent"
                      color="item"
                      tooltip={[
                      "item*percent",
                      (item, percent) => {
                          percent = percent * 100 + "%";
                          return {
                          name: item,
                          value: percent
                          };
                      }
                      ]}
                      style={{
                      lineWidth: 1,
                      stroke: "#fff"
                      }}
                  >
                      <Label
                      content="percent"
                      offset={-40}
                      textStyle={{
                          rotate: 0,
                          textAlign: "center",
                          shadowBlur: 2,
                          shadowColor: "rgba(0, 0, 0, .45)"
                      }}
                      />
                  </Geom>
              </Chart>
              <div style={{textAlign: 'center', width: '60%'}}>
                  <h2>签约统计</h2>
                  <p>未发起： 30</p>
                  <p>待他签： 25</p>
                  <p>已完成： 45</p>
              </div>
            </div>
            <div style={{float: 'left',width: '50%'}}>
                <Chart
                    height={window.innerHeight/2.4}
                    data={dv}
                    scale={cols}
                    padding={[20, 180, 20, 0]}
                    // forceFit
                    >
                    <Coord type="theta" radius={0.75} />
                    <Axis name="percent" />
                    <Legend
                        position="right"
                        offsetY={-window.innerHeight / 4 + 100}
                        offsetX={0}
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="item"
                        tooltip={[
                        "item*percent",
                        (item, percent) => {
                            percent = percent * 100 + "%";
                            return {
                            name: item,
                            value: percent
                            };
                        }
                        ]}
                        style={{
                        lineWidth: 1,
                        stroke: "#fff"
                        }}
                    >
                        <Label
                        content="percent"
                        offset={-40}
                        textStyle={{
                            rotate: 0,
                            textAlign: "center",
                            shadowBlur: 2,
                            shadowColor: "rgba(0, 0, 0, .45)"
                        }}
                        />
                    </Geom>
                </Chart>
                <div style={{textAlign: 'center', width: '60%'}}>
                    <h2>公证据统计</h2>
                    <p>未发起： 30</p>
                    <p>待他签： 25</p>
                    <p>已完成： 45</p>
                </div>
            </div>
          </div>
      </PageHeaderLayout>
    );
  }
}


