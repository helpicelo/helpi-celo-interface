import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Card,
  TextField,
  InputAdornment,
  Grid
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LaunchIcon from '@material-ui/icons/Launch';
import Loader from '../loader'
import Snackbar from '../snackbar'
import UnlockModal from '../unlock/unlockModal.jsx'

import Store from "../../stores";
import { colors } from '../../theme'

import {
  ERROR,
  CONFIGURE_RETURNED,
  LOCK,
  LOCK_RETURNED,
  GET_BALANCES_RETURNED,
  GET_BALANCES,
  CONFIGURE,
} from '../../constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '40px'
  },
  intro: {
    width: '50%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disaclaimer: {
    padding: '12px',
    border: '1px solid rgb(174, 174, 174)',
    borderRadius: '0.75rem',
    marginBottom: '24px',
    background: colors.red,
    color: colors.white
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    flex: 1,
    whiteSpace: 'nowrap',
    fontSize: '0.83rem',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    padding: '28px 30px',
    borderRadius: '50px',
    border: '1px solid ' + colors.borderRed,
    alignItems: 'center',
    maxWidth: '500px',
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  walletAddress: {
    padding: '0px 12px'
  },
  walletTitle: {
    flex: 1,
    color: colors.darkGray
  },
  lockContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '28px 30px',
    borderRadius: '50px',
    border: '1px solid ' + colors.red,
    margin: '20px',
    background: colors.white,
  },
  loadingTitle: {
    width: '100%',
    color: colors.darkGray,
  },
  lockTitle: {
    width: '100%',
    color: colors.darkGray,
    marginBottom: '20px'
  },
  valContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  actionInput: {
    padding: '0px 0px 12px 0px',
    fontSize: '0.5rem'
  },
  inputAdornment: {
    fontWeight: '600',
    fontSize: '1.5rem'
  },
  assetIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: '25px',
    background: '#dedede',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    marginRight: '16px'
  },
  balances: {
    width: '100%',
    textAlign: 'right',
    paddingRight: '20px',
    cursor: 'pointer'
  },
  buttonContainer: {
    padding: '0',
    margin: '0',
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row'
  },
  spaceBetween: { 
    justifyContent: 'space-between', 
  }
})

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class Lock extends Component {

  constructor(props) {
    super()

    this.state = {
      loading: false,
      account: null,
      cHLPAsset: null,
      CeloAsset: null,
      kit: null
    }

    dispatcher.dispatch({ type: CONFIGURE, content: {} })
    dispatcher.dispatch({ type: GET_BALANCES, content: {} })
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(CONFIGURE_RETURNED, this.configureReturned)
    emitter.on(LOCK_RETURNED, this.showHash);
    emitter.on(GET_BALANCES_RETURNED, this.balancesReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned)
    emitter.removeListener(LOCK_RETURNED, this.showHash)
    emitter.removeListener(GET_BALANCES_RETURNED, this.balancesReturned);
  };

  errorReturned = (error) => {
    this.setState({ loading: false })
  };

  balancesReturned = () => {

    const CeloAsset = store.getStore('CeloAsset')
    const cHLPAsset = store.getStore('cHLPAsset')
    this.setState({
      ...this.state,
      CeloAsset: CeloAsset,
      cHLPAsset: cHLPAsset,
    })

    // const rewardPools = store.getStore('rewardPools')
    // const governancePool = rewardPools.filter((pool) => {
    //   return pool.id === 'GovernanceV2'
    // })

    // if(governancePool.length > 0 && governancePool[0].tokens) {
    //   const cHLPToken = governancePool[0].tokens[0]
    //   this.state = {
    //     ...this.state,
    //     cHLPAsset: cHLPAsset
    //   }
    // }

  }

  showHash = (txHash) => {
    console.log(txHash)
    this.showSnackbar(txHash, 'Hash')
    dispatcher.dispatch({ type: GET_BALANCES, content: {} })
  };

  showSnackbar = (message, type) => {
    this.setState({ snackbarMessage: null, snackbarType: null, loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: message, snackbarType: type }
      that.setState(snackbarObj)
    })
  }

  configureReturned = () => {
    console.log(this.state.CeloAsset)
    this.setState({ loading: false })
  }

  render() {
    const { classes } = this.props;
    const {
      account,
      loading,
      modalOpen,
      snackbarMessage,
      CeloAsset,
      cHLPAsset,
    } = this.state

    var address = null
    if (account && account.address) {
      address = account.address.substring(0, 6) + '...' + account.address.substring(account.address.length - 4, account.address.length)
    }

    return (
      <div className={classes.root}>
        <Typography variant={'h5'} className={classes.disaclaimer}>This project is in beta. Use at your own risk.</Typography>
        <div className={classes.intro}>
          <Card className={classes.lockContainer} onClick={this.overlayClicked}>
            <Typography variant={'h3'} className={classes.walletTitle} noWrap>Wallet</Typography>
            <Typography variant={'h4'} className={classes.walletAddress} noWrap>{address}</Typography>
            <div style={{ background: '#DC6BE5', opacity: '1', borderRadius: '10px', width: '10px', height: '10px', marginRight: '3px', marginTop: '3px', marginLeft: '6px' }}></div>
          </Card>
        </div>
        {
          cHLPAsset === null &&
          <div className={classes.lockContainer}>
            <Typography className={classes.loadingTitle} variant={'h3'}>Loading your tokens ...</Typography>
          </div>
        }
        {
          cHLPAsset !== null &&
            <div>
              <div className={classes.lockContainer}>
              <Typography className={classes.lockTitle} variant={'h3'}>Lock your tokens</Typography>
              <Typography variant={'h3'} style={{color: colors.red}}>500% APR</Typography>
              {this.renderAssetInput(CeloAsset, 'lock')}
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                  <Button
                    className={classes.lockButton}
                    variant="outlined"
                    color="primary"
                    disabled={loading}
                    onClick={() => { this.onLock(this.state['' + CeloAsset.id + '_' + 'lock']) }}
                  >
                    {(loading) ? <CircularProgress color="primary" /> : <Typography variant={'h4'}>Lock tokens</Typography>}
                  </Button>
                  <div className={classes.buttonContainer}>
                    <Typography variant={'h4'}>SmartContract</Typography>
                    <Button style={{margin: '0', padding: '0', minWidth: '35px'}}>
                      <LaunchIcon onClick={() => {window.open("https://alfajores-blockscout.celo-testnet.org/address/0x681f97af12c7a8209444c41a4c24de0585fb9206", "_blank")}}/>
                    </Button>
                  </div>
              </Grid>
            </div>
          </div>
        }
        { snackbarMessage && this.renderSnackbar()}
        { loading && <Loader />}
        { modalOpen && this.renderModal()}
      </div>
    )
  }

  onLock = (amount) => {
    this.setState({
      ...this.state,
      loading: true,
    })
    console.log('amount',amount)
    dispatcher.dispatch({ type: LOCK, content: {amount} })
  }

  renderAssetInput = (asset, type) => {
    if (!asset) return null
    const {
      classes
    } = this.props

    const {
      loading,
    } = this.state

    const amount = this.state[asset.id + '_' + type]
    const amountError = this.state[asset.id + '_' + type + '_error']

    return (
      <div className={classes.valContainer} key={asset.id + '_' + type}>
        <div className={classes.balances}>
          {type === 'lock' && 
            <Typography variant='h4'
              onClick={() => { this.setAmount(asset.id, type, (asset ? asset.balance : 0)) }}
              className={classes.value}
              noWrap>{'Balance: ' + (asset && asset.balance ? (Math.floor(asset.balance * 10000) / 10000).toFixed(4) : '0.0000')}
              {asset ? asset.symbol : ''}
            </Typography>}
        </div>
        <div>
          <TextField
            fullWidth
            disabled={loading}
            className={classes.actionInput}
            id={'' + asset.id + '_' + type}
            value={amount}
            error={amountError}
            onChange={this.onChange}
            placeholder="0.00"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end" className={classes.inputAdornment}><Typography variant='h3' className={''}>{asset.symbol}</Typography></InputAdornment>,
              startAdornment: <InputAdornment position="end" className={classes.inputAdornment}>
                <div className={classes.assetIcon}>
                  <img
                    alt=""
                    src={require('../../assets/' + asset.symbol + '-logo.png')}
                    height="30px"
                  />
                </div>
              </InputAdornment>,
            }}
          />
        </div>
      </div>
    )
  }

  startLoading = () => {
    this.setState({ loading: true })
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  renderModal = () => {
    return (
      <UnlockModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
    )
  }

  renderSnackbar = () => {
    var {
      snackbarType,
      snackbarMessage
    } = this.state
    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  };

  overlayClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }
}

export default withRouter(withStyles(styles)(Lock));
