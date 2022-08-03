import React, { Component, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import LineChart from '../components/LineChart.jsx';
import io from 'socket.io-client';
import mock1h from '../dummyData/mockData_1h';


const socket = io();

function GraphContainer(props) {
  // Exposed props.chartID when creating chart at Page Level Component
  // Use dummy value of '1' for unit testing
  // const chartID = props.chartID
  const chartID = '1'
  
  const [chartData, setChartData] = useState(mock1h.data.result);

  socket.on('connect', () => {
    console.log('socket connected')
  });

  socket.on(chartID, (data) => {
    setChartData(data)
    console.log('after setting chartData: ', chartData)
  });
  
  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  async function handleClick() {
    // store for return
    let results;

    // grab metric by pulling value from our select id
    const metrics = document.getElementById('metric').value;
    const timeFrame = document.getElementById('timeframe').value; 

    let reqBody;

    // logic is wrong but we'll fix
    if (metrics === 'noChoice' && timeFrame === 'noChoice') { 
      alert("Must Choose a Metric and Timeframe") 
      return;
    }
    else if (metrics !== 'noChoice' && timeFrame === 'noChoice') {
      reqBody = {
        metric: metrics,
        timeFrame: '5m',
        chartID: '1'
      }
    }
    else if (metrics === 'noChoice' && timeFrame !== 'noChoice') {
      reqBody = {
        metric: 'kafka_server_replica_fetcher_manager_maxlag_value',
        timeFrame: timeFrame,
        chartID: '1'
      }
    }
    else {
      reqBody = {
        metric: metrics,
        timeFrame: timeFrame,
        chartID: '1'
      }
    }

    console.log('reqBody: ',reqBody)

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
      })
      .then((formattedData) => {
          console.log(formattedData)
      })
      .catch(err => {
          console.log('Error thrown in POST request in graphContainer: ', err)
      })
    return results;
  }

  // return our render
  // need 2 drop downs -> 1) metrics, 2) timeframe
  return (
    <div id='graphContainer'>

      <div className="selectDropdown">
        {/* metrics */}
        <select id='metric' onChange={handleClick}>
          <option value="noChoice">Metric</option>
          {/* histogram unless specified both hist/pie */}
          <option value="kafka_server_replica_fetcher_manager_maxlag_value" >Kafka Replica Fetcher Manager Max Lag</option >
          <option value="kafka_server_request_handler_avg_idle_percent" >Kafka Request Handler Average Idle Percentage</option>
          <option value="kafka_server_replica_manager_offlinereplicacount" >Kafka Replica Manager Offline Replica Count</option>
          <option value="kafka_server_replica_fetcher_manager_failedpartitionscount_value" >Kafka Replica Fetcher Manager Failed Partitions Count</option >
          <option value="kafka_server_broker_topic_metrics_bytesinpersec_rate" >Kafka Broker Topic Metrics Bytes In Per Sec</option>
          <option value="kafka_server_broker_topic_metrics_bytesoutpersec_rate" >Kafka Broker Topic Metrics Bytes Out Per Sec</option>
          {/* <option value="kafka_jvm_heap_usage" >Kafka JVM Heap Usage</option >
          <option value="kafka_jvm_non_heap_usage" >Kafka JVM Non-Heap Usage</option> */}
          <option value="kafka_server_broker_topic_metrics_messagesinpersec_rate" >Kafka Broker Topic Metrics Messages In Per Sec</option>
          <option value="kafka_network_request_metrics_time_ms" >{`Kafka Network Request Time (ms)`}</option >
          <option value="kafka_server_broker_topic_metrics_replicationbytesinpersec_rate" >Kafka Broker Topic Metrics replication bytes In Per Sec</option>
          <option value="kafka_server_replica_manager_underreplicatedpartitions" >Kafka Replica Manager Under Replicated Partitions</option>
          <option value="kafka_server_replica_manager_failedisrupdatespersec" >Kafka Replica Manager Failed Updates Per Second</option>
          {/* prometheus connection health */}
          {/* <option value="scrape_duration_seconds" >{`Scrape Duration (seconds)`}</option>
          <option value="scrape_samples_scraped" >{`Samples Scraped`}</option> */}
          {/* pie chart metrics */}
          {/* <option value="kafka_coordinator_group_metadata_manager_numgroups" >Kafka Number of Metadata Groups</option>
          <option value="kafka_coordinator_group_metadata_manager_numgroupsdead" >Kafka Number of Dead Metadata Groups</option>
          <option value="kafka_coordinator_group_metadata_manager_numgroupsempty" >Kafka Number of Empty Metadata Groups</option> */}
        </select>

        {/* timeframe */}
        <select id='timeframe' onChange = {handleClick}>
          <option value="noChoice">Timeframe</option>
          <option value="1m">1m</option>
          <option value="5m">5m</option>
          <option value="15m">15m</option>
          <option value="30m">30m</option>
          <option value="1h">1h</option>
          <option value="2h">2h</option>
          <option value="4h">4h</option>
          <option value="6h">6h</option>
          <option value="12h">12h</option>
        </select>
      </div>

      <LineChart chartData={chartData}/>
    </div>
  )
}

export default GraphContainer;