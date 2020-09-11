import { Injectable, NgZone } from "@angular/core";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Observable } from "rxjs";

const contractAbi = require("./contractABI.json");
declare var window: any;

@Injectable({
  providedIn: "root",
})
export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private contractAddress = "0xeC203a154AE7AAaCCC3b499a728f8477d8E411DA";

  constructor(private zone: NgZone) {
    if (window.web3) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        contractAbi,
        this.contractAddress
      );

      window.ethereum.enable().catch((err) => console.error(err));
    } else {
      console.warn("Metamask not found, Install or Enable metamask");
    }
  }

  getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0] || "");
  }

  async executeTransaction(fnName: string, ...args: any): Promise<void> {
    const account = await this.getAccount();
    return this.contract.methods[fnName](...args).send({ from: account });
  }

  async call(fnName: string, ...args: any) {
    const account = await this.getAccount();
    return this.contract.methods[fnName](...args).call({ from: account });
  }

  onEvents(event: string) {
    return new Observable((observer) => {
      this.contract.events[event]().on("data", (data) => {
        this.zone.run(() => {
          observer.next({
            event: data.event,
            payload: data.returnValues,
          });
        });
      });
    });
  }
}
