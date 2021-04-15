import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { colors } from '../../theme'

import LockIcon from '@material-ui/icons/Lock';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ExploreIcon from '@material-ui/icons/Explore';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    }
  },
  card: {
    flex: '1',
    height: '25vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    borderRadius: '0px',
    transition: 'background-color 0.2s linear',
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
      minWidth: '20%',
      minHeight: '50vh',
    }
  },
  stake: {
    backgroundColor: colors.white,
    '&:hover': {
      backgroundColor: colors.red,
      '& .title': {
        color: colors.white
      },
      '& .icon': {
        color: colors.white
      }
    },
    '& .title': {
      color: colors.red
    },
    '& .icon': {
      color: colors.red
    }
  },
  vote: {
    backgroundColor: colors.white,
    '&:hover': {
      backgroundColor: colors.red,
      '& .title': {
        color: colors.white,
      },
      '& .icon': {
        color: colors.white
      }
    },
    '& .title': {
      color: colors.blue,
      display: 'block'
    },
    '& .soon': {
      color: colors.red,
      display: 'none'
    },
    '& .icon': {
      color: colors.red
    },
  },
  lock: {
    backgroundColor: colors.white,
    '&:hover': {
      backgroundColor: colors.red,
      '& .title': {
        color: colors.white,
      },
      '& .icon': {
        color: colors.white
      }
    },
    '& .title': {
      color: colors.red,
    },
    '& .icon': {
      color: colors.red
    },
  },
  title: {
    padding: '24px',
    paddingBottom: '0px',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '24px'
    }
  },
  icon: {
    fontSize: '60px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '100px',
    }
  },
  link: {
    textDecoration: 'none'
  }
});

class Home extends Component {

  constructor(props) {
    super()

    this.state = {
    }
  }

  render() {
    const { classes, t, location } = this.props;

    return (
      <div className={ classes.root }>
        <Card className={ `${classes.card} ${classes.lock}` } onClick={ () => { this.nav(location.pathname+'lock') }}>
          <LockIcon className={ `${classes.icon} icon` } />
          <Typography variant={'h3'} className={ `${classes.title} title` }>Lock</Typography>
        </Card>
        <Card className={ `${classes.card} ${classes.stake}` } onClick={ () => { this.nav(location.pathname+'lock') } }>
          <FilterHdrIcon className={ `${classes.icon} icon` } />
          <Typography variant={'h3'} className={ `${classes.title} title` }>Stake</Typography>
        </Card>
        <Card className={ `${classes.card} ${classes.lock}` } onClick={ () => { window.open("https://celohelpi.org/Helpi_Litepaper_Final.pdf", "_blank") } }>
          <LibraryBooksIcon className={ `${classes.icon} icon` } />
          <Typography variant={'h3'} className={ `${classes.title} title` }>Lite Paper</Typography>
        </Card>
        <Card className={ `${classes.card} ${classes.lock}` } onClick={ () => { window.open("https://celohelpi.org/roadmap.pdf", "_blank") } }>
          <ExploreIcon className={ `${classes.icon} icon` } />
          <Typography variant={'h3'} className={ `${classes.title} title` }>RoadMap</Typography>
        </Card>
      </div>
    )
  };

  nav = (screen) => {
    this.props.history.push(screen)
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Home)));
