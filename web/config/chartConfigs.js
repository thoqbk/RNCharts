export default [
  {
    dataKey: 'ordersCount',
    label: 'Orders',
    items: [
      {
        dataKey: 'yesterday',
        color: '#E14823',
        label: 'Yesterday'
      }, {
        dataKey: 'lastWeek',
        color: '#E0B805',
        label: 'Last Week'
      },
      {
        dataKey: 'today',
        color: '#3580D5',
        label: 'Today',
        lastPointLabel: true
      }
    ]
  }, {
    label: 'Bar Chart',
    type: 'bar',
    dataKey: 'barChartData',
    items: [
      {
        dataKey: 'uv',
        color: '#E14823',
        label: 'Yesterday'
      }, {
        dataKey: 'pv',
        color: '#3580D5',
        label: 'Last Week'
      }
    ]
  }, {
    label: 'Area Chart',
    type: 'area',
    dataKey: 'areaChartData',
    items: [
      {
        dataKey: 'uv',
        color: '#E14823',
        label: 'Yesterday'
      }, {
        dataKey: 'pv',
        color: '#3580D5',
        label: 'Last Week'
      }
    ]
  }, {
    label: 'Pie Chart',
    type: 'pie',
    dataKey: 'pieChartData',
    items: [
      {
        dataKey: 'uv',
        color: '#E14823',
        label: 'Yesterday'
      }, {
        dataKey: 'pv',
        color: '#3580D5',
        label: 'Last Week'
      }, {
        dataKey: 'amt',
        color: '#E0B805',
        label: 'Last Week'
      }
    ]
  }, {
    dataKey: 'revenue',
    label: 'Revenue',
    items: [
      {
        dataKey: 'yesterday',
        color: '#E14823',
        label: 'Yesterday'
      }, {
        dataKey: 'lastWeek',
        color: '#E0B805',
        label: 'Last Week'
      }, {
        dataKey: 'today',
        color: '#3580D5',
        label: 'Today',
        lastPointLabel: true
      }
    ]
  }, {
    dataKey: 'profit',
    label: 'Profit',
    items: [
      {
        dataKey: 'yesterday',
        color: '#E14823',
        label: 'Yesterday'
      }, {
        dataKey: 'lastWeek',
        color: '#E0B805',
        label: 'Last Week'
      }, {
        dataKey: 'today',
        color: '#3580D5',
        label: 'Today',
        lastPointLabel: true
      }
    ]
  }, {
    dataKey: 'productsCount',
    label: 'Products',
    items: [
      {
        dataKey: 'yesterday',
        color: '#E14823',
        label: 'Yesterday'
      }, {
        dataKey: 'lastWeek',
        color: '#E0B805',
        label: 'Last Week'
      }, {
        dataKey: 'today',
        color: '#3580D5',
        label: 'Today',
        lastPointLabel: true
      }
    ]
  }
]
