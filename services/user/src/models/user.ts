import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('profiles')
export default class User {
	@PrimaryColumn({ type: 'varchar' })
	id!: string

	@Column({ type: 'varchar' })
	name!: string

	@Column({ type: 'varchar', unique: true })
	email!: string

	@Column({ type: 'varchar', nullable: true })
	avatar!: string | null

	@CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
	createdAt!: Date
}

// Note:
// typeorm requires emitDecoratorMetadata, but tsx doesn't support it 😕
// https://github.com/privatenumber/tsx/issues/740
