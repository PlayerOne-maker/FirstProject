import { useQuery } from '@apollo/client'
import React, { forwardRef } from 'react'
import { SHOWREQUESTLEAVEME } from '../apollo/querys'
import { TableuserCSS } from '../CSScomponents/Tableuser'
import { showrequestleave } from '../types'
import MaterialTable from 'material-table'
import Search from '@material-ui/icons/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default function Tableuser() {

  const { data } = useQuery(SHOWREQUESTLEAVEME,{fetchPolicy:"network-only"})


  return (
    <TableuserCSS>
      <div className="table">
        <MaterialTable
          columns={[
            { title: 'Requested date', field: 'at' },
            { title: 'From', field: 'from', type: "date" },
            { title: 'To', field: 'to', type: "date" },
            { title: 'Desciption', field: 'dec', type: "string" },
            { title: 'Appove', field: 'leader' },
            { title: 'Byleader', field: 'leaderby' },
            { title: 'Appove', field: 'hr' },
            { title: 'ByHr', field: 'hrby' },
          ]}
          data={data && data?.showrequiedleaveMe.map((request: showrequestleave) => ({
            at: new Date(request.createAt).toLocaleDateString('en-GB'),
            from: new Date(request.from).toLocaleDateString('en-GB') + ' ' + request.descriptionfrom,
            to: new Date(request.to).toLocaleDateString('en-GB') + ' ' + request.descriptionto,
            dec: request.descriptionleave,
            leader: request.leader === 'APPOVE' ? <FontAwesomeIcon icon={faCheckCircle} color="green" size="lg" />
              : request.leader === 'REJECT' ? <FontAwesomeIcon icon={faTimesCircle} color="red" size="lg" />
                : <FontAwesomeIcon icon={faTimesCircle} color="grey" size="lg" />,
            leaderby: !request.leaderBy ? '' : request.leaderBy.username,
            hr: request.hr === 'APPOVE' ? <FontAwesomeIcon icon={faCheckCircle} color="green" size="lg" />
              : request.hr === 'REJECT' ? <FontAwesomeIcon icon={faTimesCircle} color="red" size="lg" />
                : <FontAwesomeIcon icon={faTimesCircle} color="grey" size="lg" />,
            hrby: !request.hrBy ? '' : request.hrBy.username,
          }))}
          title="Requset leave"
          options={{
            search: true,
          }}
          icons={{
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
          }}

        />


      </div>
    </TableuserCSS>
  )
}
