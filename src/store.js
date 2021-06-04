import axios from 'axios';
import {action, makeAutoObservable, observable, runInAction, toJS} from "mobx";
import {get_loader_for_class_instance, setup_async_loaders} from './async_loaders';

class Store {

    constructor() {
        setup_async_loaders(this)
        makeAutoObservable(this)
    }

    success = false
    hedera_account = false
    dropdown = {
        input_value: '',
        is_open: false
    }
    body = {
        name: '',
        email: '',
        customer_private_key: '',
        customer_account_id: '',
        token: {}
    }
    get ready_to_submit() {
        return !this.body.token.name 
        || !store.body.name > 4 
        || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.body.email)
    }

    handle_submit = async () => {
        try {
            const body = this.body
            console.log(body)
            // const {data} = await axios.post('https://hederata.herokuapp.com/token', body)
            const url = window.location.href === "http://localhost:3000/" ? 'http://localhost:3001/checkout' : 'https://hederata.herokuapp.com/checkout'
            const {data} = await axios.post(url, body)

            // console.log(data)
            runInAction(() => {
                this.success = true
            })
        } catch (err) {
            alert(JSON.stringify(err.response.data, null, 4))
            console.error(err)
            return err
        }

    }
}

export const store = new Store()
window.store = store