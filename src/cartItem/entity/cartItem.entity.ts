import { ShoppingCart } from '@shoppingCart/entity/shoppingCart.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@Column({ default: new Date() })
	date: Date;

	@Column()
	productId: number;

	@Column()
	price: number;

	@ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.cartItems, {
		cascade: ['insert'],
		onDelete: 'CASCADE',
	})
	shoppingCart: ShoppingCart;
}
