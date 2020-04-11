// import React from 'react';
// import ReactGA from 'react-ga';
// import { connect } from 'react-redux';
//
//
// const MenuLink = props => {
//
//   const onMenuLinkClick = () => {
//
//     ReactGA.event({
//       category: 'MenuLink Clicked',
//       action: `id # ${props.project.id} -> clicked`
//     });
//
//     props.dispatch({        // need to implement
//       type: 'LINK_PRESSED'
//     })
//   }
//
//   // console.log(props,'haha')
//
//   return (
//     <li className="menuName"><a onClick={onMenuLinkClick} className="hyperLink" href={props.project.link}>{props.project.title}</a></li>
//   );
// }
//
//
//
// export default connect()(MenuLink);
