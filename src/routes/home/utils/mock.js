export const products = [
	{
		'group': '1',
		'subgroup': '01',
		'variation': '00',
		'unity': 'UN',
		'provider': 'LASOLANA',
		'_id': '5e226b2b6a34c54a2e7df876',
		'code': '10100',
		'price': 4,
		'name': 'AGUA 500 ML',
		'description': 'SEM GAS',
		'ref': '10100',
		'createdAt': '2020-01-18T02:19:23.690Z',
		'updatedAt': '2020-01-18T02:19:23.690Z',
		'__v': 0
	},
	{
		'group': '1',
		'subgroup': '01',
		'variation': '01',
		'unity': 'UN',
		'provider': 'LASOLANA',
		'_id': '5e227024662755575d28c340',
		'code': '10101',
		'price': 4,
		'name': 'AGUA 500ML',
		'description': 'COM GAS',
		'ref': '10101',
		'createdAt': '2020-01-18T02:40:36.137Z',
		'updatedAt': '2020-01-18T02:40:36.137Z',
		'__v': 0
	}
];

export const deliveriesMock = [
	{
		'costumer': 'Jean Felipe de Melo',
		'delivered': false,
		'_id': '5e25249f3ededf51b947ee45',
		'paymentMethod': 'DINHEIRO',
		'address': {
			'street': 'rua Altamiro Barcelos Dutra',
			'number': '1396',
			'district': 'Barra da Lagoa',
			'ref': 'Em frente à Central da Barra',
			'geo': {
				'Latitude': -27.57544,
				'Longitude': -48.42764
			}
		},
		'orderId': 'X08Bl',
		'order': {
			'user': '9ICA - Jean Felipe de Melo',
			'serviceTax': 0,
			'items': [
				{
					'quantity': 1,
					'code': '10*10102010',
					'title': '10 - PIZZA SIMPLES PEQUENA',
					'description': [
						'1010 - MUSSARELA',
						'2010 - LA SOLANA'
					],
					'owner': 'Geral',
					'price': 33,
					'subtotal': 33
				}
			],
			'total': 0,
			'final': 0,
			'paid': 0,
			'remaining': 0,
			'change': 0,
			'payments': [],
			'closed': false,
			'_id': '5e25249f3ededf51b947ee46',
			'orderId': 'X08Bl',
			'createdAt': '2020-01-20T03:55:11.385Z',
			'updatedAt': '2020-01-20T03:55:11.385Z',
			'__v': 0
		},
		'createdAt': '2020-01-20T03:55:12.729Z',
		'updatedAt': '2020-01-20T03:55:12.729Z',
		'__v': 0
	},
	{
		'costumer': 'Ivona Petrova',
		'delivered': false,
		'_id': '5e252ba83ededf51b947ee47',
		'paymentMethod': 'DINHEIRO',
		'address': {
			'street': 'Travessa Maria Eduvirgens da Conceição',
			'number': '86',
			'district': 'Barra da Lagoa',
			'ref': 'cú do mundo',
			'geo': {
				'Latitude': -27.574565,
				'Longitude': -48.4243514
			}
		},
		'orderId': '8ydXo',
		'order': {
			'user': '9ICA - Jean Felipe de Melo',
			'serviceTax': 0,
			'items': [
				{
					'quantity': 1,
					'code': '10*10102010',
					'title': '10 - PIZZA SIMPLES PEQUENA',
					'description': [
						'1010 - MUSSARELA',
						'2010 - LA SOLANA'
					],
					'owner': 'Geral',
					'price': 33,
					'subtotal': 33
				}
			],
			'total': 0,
			'final': 0,
			'paid': 0,
			'remaining': 0,
			'change': 0,
			'payments': [],
			'closed': false,
			'_id': '5e252ba83ededf51b947ee48',
			'orderId': '8ydXo',
			'createdAt': '2020-01-20T04:25:12.625Z',
			'updatedAt': '2020-01-20T04:25:12.625Z',
			'__v': 0
		},
		'createdAt': '2020-01-20T04:25:14.146Z',
		'updatedAt': '2020-01-20T04:25:14.146Z',
		'__v': 0
	}
];

export const order = {
	'user': 'ADMIN',
	'serviceTax': 20.9,
	'items': [
		{
			'quantity': 1,
			'code': '12*2010',
			'title': '12 - PIZZA SIMPLES GRANDE',
			'description': [
				'2010 - LA SOLANA (SEM MAIONESE)'
			],
			'owner': 'Geral',
			'price': 55,
			'subtotal': 55
		},
		{
			'quantity': 1,
			'code': '12*1070',
			'title': '12 - PIZZA SIMPLES GRANDE',
			'description': [
				'1070 - ANITA'
			],
			'owner': 'Jean',
			'price': 55,
			'subtotal': 55
		},
		{
			'quantity': 1,
			'code': '12*1031',
			'title': '12 - PIZZA SIMPLES GRANDE',
			'description': [
				'1031 - ALHO'
			],
			'owner': 'Jean',
			'price': 55,
			'subtotal': 55
		},
		{
			'quantity': 1,
			'code': '11*1120',
			'title': '11 - PIZZA SIMPLES MEDIA',
			'description': [
				'1120 - PARMEGIANA'
			],
			'owner': 'Ivona',
			'price': 44,
			'subtotal': 44
		}
	],
	'total': 209,
	'final': 229.9,
	'paid': 0,
	'remaining': 229.9,
	'change': 0,
	'payments': [],
	'closed': false,
	'_id': '5e254d3c3ededf51b947ee4a',
	'orderId': 'PYW5h',
	'createdAt': '2020-01-20T06:48:28.716Z',
	'updatedAt': '2020-01-23T01:49:07.864Z',
	'__v': 4
};