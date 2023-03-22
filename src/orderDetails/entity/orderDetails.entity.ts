import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
//importar orderitems e paymentdetails quando pronto
@Entity()
export class OrderDetails {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	total: number;

	@Column()
	userId: number;

	@Column()
	payment: PaymentDetailsBase;

	@Column({ default: new Date() })
	date: Date;

	@Column()
	identifier: string;

	@OneToMany(() => OrderItems, orderItems => orderItems.orderDetails, {
		onDelete: 'CASCADE',
		cascade: ['remove'],
	})
	items: Array<OrderItems>;
}
