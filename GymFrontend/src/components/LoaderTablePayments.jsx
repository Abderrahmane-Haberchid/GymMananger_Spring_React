import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderTablePayments = props => (
  <ContentLoader
      width={350}
      height={600}
      viewBox="0 0 350 600"
      backgroundColor="#f5f5f5"
      foregroundColor="#dbdbdb"
      {...props}
      style={{backgroundColor: 'var(--sidebar-color)'}}
  >
    <rect x="4" y="8" rx="3" ry="3" width="8" height="570" />
      <rect x="5" y="573" rx="3" ry="3" width="331" height="7" />
      <rect x="329" y="9" rx="3" ry="3" width="8" height="570" />
      <rect x="102" y="69" rx="3" ry="3" width="102" height="7" />
      <rect x="92" y="47" rx="3" ry="3" width="178" height="6" />
      
      <rect x="95" y="95" rx="3" ry="3" width="178" height="6" />
      <rect x="105" y="169" rx="3" ry="3" width="102" height="7" />
      <rect x="95" y="147" rx="3" ry="3" width="178" height="6" />
      
      <rect x="98" y="195" rx="3" ry="3" width="178" height="6" />
      <rect x="107" y="265" rx="3" ry="3" width="102" height="7" />
      <rect x="97" y="243" rx="3" ry="3" width="178" height="6" />
      
      <rect x="100" y="291" rx="3" ry="3" width="178" height="6" />
      <rect x="108" y="365" rx="3" ry="3" width="102" height="7" />
      <rect x="98" y="343" rx="3" ry="3" width="178" height="6" />
      
      <rect x="101" y="391" rx="3" ry="3" width="178" height="6" />
      <rect x="110" y="458" rx="3" ry="3" width="102" height="7" />
      <rect x="100" y="436" rx="3" ry="3" width="178" height="6" />
      
      <rect x="103" y="484" rx="3" ry="3" width="178" height="6" />
      <rect x="114" y="507" rx="3" ry="3" width="102" height="7" />
      <rect x="103" y="534" rx="3" ry="3" width="178" height="6" />
      <rect x="5" y="8" rx="3" ry="3" width="331" height="7" />
  </ContentLoader>
)
/*
LoaderTablePayments.metadata = {
  name: 'Mohd Arif Un',
  github: 'arif-un',
  description: 'Data Table skeleton',
  filename: 'DataTable',
}*/

export default LoaderTablePayments