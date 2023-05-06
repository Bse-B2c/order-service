import { CartItem } from '@cartItem/entity/cartItem.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShoppingCart {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	total: number;

	@OneToMany(() => CartItem, cartItem => cartItem.shoppingCart, {
		onDelete: 'CASCADE',
		cascade: ['remove'],
	})
	cartItems: Array<CartItem>;
}
