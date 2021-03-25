import React from 'react'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as VscIcons from 'react-icons/vsc'
import AddQuestionModal from '../modals/AddQuestionModal'

export const SidebarData = [
  {
    title: 'Surveys',
    //path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Parkinson',
        //path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Sleep Disorders',
        //path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Obesity',
        //path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'New survey',
    //path: '/team',
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: <AddQuestionModal />,
    //path: '/team',

    icon: <IoIcons.IoMdAddCircle />,
  },
  {
    title: 'Remove question',
    //path: '/team',
    icon: <IoIcons.IoMdRemoveCircle />,
  },

  {
    title: 'Preview',
    //path: '/support',
    icon: <VscIcons.VscPreview />,
  },
]
