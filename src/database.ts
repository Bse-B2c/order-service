import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { OrderDetails } from '@orderDetails/entity/orderDetails.entity';
import { PaymentDetails } from '@paymentDetails/entity/paymentDetails.entity';
import { OrderItems } from '@orderItems/entity/orderItems.entity';
import { CartItem } from '@cartItem/entity/cartItem.entity';
import { ShoppingCart } from '@shoppingCart/entity/shoppingCart.entity';

dotenv.config();

export const dataSource = new DataSource({
	type: 'postgres',
	host: process.env['TYPEORM_HOST'] ?? 'localhost',
	port: Number(process.env['TYPEORM_PORT']) || 5432,
	username: process.env['TYPEORM_USERNAME'],
	password: process.env['TYPEORM_PASSWORD'],
	database: process.env['TYPEORM_DATABASE'],
	entities: [OrderDetails, PaymentDetails, OrderItems, CartItem, ShoppingCart],
	synchronize: true,
});

class PostgresDB {
	constructor(private dataSource: DataSource) {}

	async connect(): Promise<void> {
		try {
			await this.dataSource.initialize();
		} catch (e) {
			console.error('Error during Data Source initialization', e);
		}
	}
}

export default new PostgresDB(dataSource);
