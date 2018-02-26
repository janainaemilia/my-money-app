const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete']) // Métodos que serão interceptados pela API
BillingCycle.updateOptions({ new: true, runValidators: true }) // Configuração para o mongo retornar o dado novo numa atualização, e aplicar as validações
BillingCycle.after('post', errorHandler).after('put', errorHandler)

BillingCycle.route('count', (req, res, next) => {
	BillingCycle.count((error, value) => {
		if(error)
			res.status(500).json({ errors: [error] })
		res.json({value})
	})
})

// Montando sumário a partir dos dados
BillingCycle.route('summary', (req, res, next) => {
	BillingCycle.aggregate({
		$project: { credit: { $sum: "$credits.value"}, debt: { $sum: "$debts.value" }}
	}, {
		$group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" }}
	}, {
		$project: { _id: 0, credit: 1, debt: 1} // extraindo
	}, (error, result) => {
		if(error)
			res.status(500).json({errors: [error]})
		else
			res.json(result[0] || { credit: 0, debt: 0 })
	})
})

module.exports = BillingCycle