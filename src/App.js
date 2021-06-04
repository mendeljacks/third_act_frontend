import {Button, CircularProgress, MenuItem, Select, Switch, TextField, Tooltip, Typography} from "@material-ui/core";
import {action} from "mobx";
import {observer} from "mobx-react-lite";
import React from "react";
import {get_loader_for_class_instance} from "./async_loaders";
import {SearcherV2} from "./searcher_v2";
import {store} from './store'

const Form = observer(() => {
  return <>
    {store.body.token.name && <div style={{display: 'grid', placeItems: 'center'}}>
      <img style={{objectFit: 'contain', width: '300px', height: '300px'}} src={store.body.token.src} />
      <Typography style={{padding: '10px'}}>Price: {store.body.token.tinybars / 1000000000} Hbar (~{(store.body.token.tinybars*0.226443/1000000000).toFixed(2)} USD)</Typography>

    </div>}
    <h3>1. Select a token</h3>
    <SearcherV2
      input_value={store.dropdown.input_value}
      set_input_value={action(val => store.dropdown.input_value = val)}
      selected_option={store.body.token}
      set_selected_option={action(o => {
        store.body.token = o
      })}
      options={[
        {name: "Herding Cats Attendee Ticket", symbol: 'TT', tinybars: 3 * 1000000000, src: 'http://drive.google.com/uc?export=view&id=1ivtojSSA9y0ETVlNXie_etCBIOARZTv5'},
        {name: "Orange", symbol: 'TT', tinybars: 1 * 1000000000, src: 'https://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY='},
        {name: "Banana", symbol: 'TT', tinybars: 4 * 1000000000, src: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg'}
      ]}
      options_are_prefiltered={false}
      render_option={o => o.name}
      get_option_label={o => o.name}
      label={'Select Token'}
      // helper_text,
      // is_loading,
      is_open={store.dropdown.is_open}
      set_is_open={action(bool => store.dropdown.is_open = bool)}
      required={true}
      // error,
      // disabled,
      fullWidth
      disableClearable
    />


    <h3>2. Personal Details</h3>
    <TextField
      fullWidth
      value={store.body.name}
      onChange={action(e => store.body.name = e.target.value)}
      variant='outlined'
      label='Name'
    />
    <TextField
      fullWidth
      value={store.body.email}
      onChange={action(e => store.body.email = e.target.value)}
      variant='outlined'
      label='Email'
    />
    <h3>3. Crypto Account</h3>
    <div>
      I have an Hbar wallet
      <Switch value={store.hedera_account} onChange={action(e => store.hedera_account = e.target.checked)} />
    </div>
    { store.hedera_account && <><TextField
      value={store.body.customer_account_id}
      onChange={action(e => store.body.customer_account_id = e.target.value)}
      fullWidth
      // helperText="Hedera account id comes from the wallet"
      variant='outlined'
      label='Hedera Account ID'
    />
      <TextField
        value={store.body.customer_private_key}
        onChange={action(e => store.body.customer_private_key = e.target.value)}
        fullWidth
        // helperText="Hedera account id comes from the wallet"
        variant='outlined'
        label='Hedera Private Key'
      /></>}
    <Button
      disabled={store.ready_to_submit}
      style={{
        backgroundColor: store.ready_to_submit ? 'lightgray' : '#4c00ff',
        color: 'white',
        fontSize: '150%',
        height: '60px'
      }}
      variant='outlined' fullWidth onClick={() => store.handle_submit()}>
      {store._loaders['handle_submit/'] ? <CircularProgress color="white" size={25} /> : 'Submit'}
    </Button></>
})

export const App = observer(() => {
  return (
    <div style={{borderRadius: '20px', padding: '20px', backgroundColor: 'white', display: 'grid', gap: '15px', width: '500px', placeItems: 'center'}}>
      {!store.success && <h1 style={{fontWeight: 'bold'}}>Checkout</h1>}
      {!store.success && <Form />}
      {store.success && <h1 style={{fontWeight: 'bold'}}>Bravo!</h1>}
      {store.success && 'Your NFT is being held. A member of the Third Act team will be in touch shortly to finalize your purchase and assist with the set up of your wallet if needed. Due to the influx of demand please allow for 48 hours to return your message.'}
      {store.success && <Button variant='outlined' onClick={() => window.location.reload()}>Back</Button>}



    </div>
  );
})