class ClienteDAO {
    constructor(connection) {
        this.connection = connection();
    }
    getUser(userName) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM Cliente WHERE nome = '${userName}'`, (err, rows, fields) => {
                if (err) {
                    reject(err)
                }else {
                    resolve(rows[0]);
                }
            })
        })
    }

    updateUser (userID , userUpdates){
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE Cliente set ?  WHERE IDCliente =  ${userID}`, userUpdates, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            })
        })
    }


    deleteUser (userID) {
        return new Promise((resolve, reject) => {
            this.connection.query(`DELETE FROM Cliente WHERE IDCliente = ${userID}`, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            })
        })
    }

    insertUser(user) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO Cliente set ?" , user , (err , userInserted) => {
                if(userInserted) {
                    resolve(userInserted);
                }else {
                    reject(err)
                }
            })
        })
    }
       
}

module.exports = () => ClienteDAO;