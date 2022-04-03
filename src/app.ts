// src/app.ts
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import * as faucet from '../ithacanet.json';

export class App {
    [x: string]: any;
    private tezos: TezosToolkit;
    antecedent: string= "";
    emailMedecin: string= "";
    emailPatient: string= "";
    dateConsultation: string= "";
    temperature: string= "";
    signeEtSymptome: string= "";
    diagnostique: string= "";
    poids: string= "";
    imc: string= "";
    taille: string= "";
    traitement: string= "";
    suivi: string= ""
    
    
    constructor(rpcUrl: string) {
        this.tezos = new TezosToolkit(rpcUrl);
        this.tezos = new TezosToolkit(rpcUrl);
        this.tezos.setSignerProvider(InMemorySigner.fromFundraiser(faucet.email, faucet.password, faucet.mnemonic.join(' ')))
 
    }

    public getBalance(address: string) : void {
        this.tezos.rpc
            .getBalance(address)
            .then(balance => console.log(balance))
            .catch(e => console.log('Address not found'));
    }

    public getContractEntrypoints(address: string) {
        this.tezos.contract
            .at(address)
            .then((c) => {
                let methods = c.parameterSchema.ExtractSignatures();
                console.log(JSON.stringify(methods, null, 2));
            })
            .catch((error) => console.log(`Error: ${error}`));
    }

    public addAntecedent(antecedant:any,contract: string) {
        this.tezos.contract
            .at(contract) // step 1
            .then((contract) => {
                console.log(`Add new antecedent`);
                console.log(`emailMedecin: `, antecedant.EmailMedecin );
                console.log(`emailPatient: `, antecedant.emailPatient);
                console.log(`antecedent: `, antecedant.antecedent);
                
                return contract.methods.addAntecedent(antecedant.antecedent,
                  antecedant.EmailMedecin,
                  antecedant.emailPatient
                ).send(); // steps 2, 3 and 4
                })
            .then((op) => {
                console.log(`Awaiting for ${op.hash} to be confirmed...`);
                return op.confirmation(3).then(() => op.hash); // step 5
            })
            .then((hash) => console.log(`Operation injected: https://ithacanet.smartpy.io/${hash}`))
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`,error));
    }
    //ajouter une consultation
    public addConsultation(consultation:any, contract: string) {
         this.tezos.contract
            .at(contract) // step 1
           .then((contract) => {
               console.log(`Add new consulting`); 
               console.log(`emailMedecin: `, consultation.emailMedecin);
               console.log(`emailPatient: `, consultation.emailPatient);
               console.log(`dateConsultation: `, consultation.dateConsultation);
               console.log(`temperature: `, consultation.temperature);
               console.log(`signeEtSymptomes: `, consultation.signeEtSymptomes);
               console.log(`diagnostique: `, consultation.diagnostique);
               console.log(`poids: `, consultation.poids.toString());
               console.log(`imc: `, consultation.imc);
               console.log(`taille: `, consultation.taille);
               console.log(`suivi: `, consultation.suivi);

                return contract.methods.addConsultation(consultation.dateConsultation.toString(), consultation.diagnostique, consultation.emailMedecin, consultation.emailPatient,
                    consultation.imc.toString(), consultation.poids.toString(), consultation.signeEtSymptomes, consultation.suivi,
                    consultation.taille.toString(),  consultation.temperature.toString(), consultation.traitement 
                    ).send(); // steps 2, 3 and 4
                })
           .then((op) => {
                console.log(`Awaiting for ${op.hash} to be confirmed...`);
               return op.confirmation(3).then(() => op.hash); // step 5
           })
           .then((hash) => console.log(`Operation injected: https://ithacanet.smartpy.io/${hash}`))
            .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`,error));
     }
    public async main() { }
}