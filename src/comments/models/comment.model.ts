import { Column, Table, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Card } from "src/cards/models/card.model";
import { User } from "src/users/models/user.model";

@Table
export class Comment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    @ForeignKey(() => User)
    ownerId: number

    @Column
    @ForeignKey(() => Card)
    parentCardId: number

    // ставим каскадное удаление
    @BelongsTo(() => Card, {
        onDelete: 'cascade'
    })
    parentCard: Card

    @Column
    content: string
}