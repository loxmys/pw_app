
export class TransactionService {
    constructor(api, tree) {
        this.api = api;
        this.tree = tree;
        this.transactionList = this.tree.select('transactionList');
        this.transaction = this.tree.select('transaction');
    }
    createTransaction(name, amount){
        return this.api.custom('api/protected/transactions').post({name, amount}).then((response) => {
            const result = response.body();
            const transaction = result.data();
            console.log(JSON.stringify(transaction));
            this.transaction.set(transaction);
            return transaction;
        });
    }
    getTransactionList() {
        return this.api.custom('api/protected/transactions').get().then((response) => {
            const result = response.body();
            const transactionList = (result.data().trans_token || []).reverse();
            this.transactionList.set(transactionList);
            return transactionList;
        })
    }
}