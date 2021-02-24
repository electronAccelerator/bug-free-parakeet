import React, { useState } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { observable } from 'mobx';
import { v4 as uuid} from 'uuid';

import TodoListItem from './TodoListItem'


function TodoList({ className }) {
    const [ store ] = useState(createTodoStore);




    return (
        <div className={className}>
            <header>
                <h1 className="title">TODO List Example</h1>
            </header>
            <section>
                <ul>
                    {store.activeItems.map(item => (
                        <TodoListItem
                            key={item.id}
                            name={item.name}
                            isDeleted={item.isDeleted}
                            isComplete={item.isComplete}
                            tags={item.tags}
                            onComplete={() => store.setCompleted(item.id)}
                            onDelete={() => store.setDeleted(item.id)}
                            onChange={(e) => store.setItemName(item.id, e.target.value)}
                            addTags={(e) => store.setItemTags(item.id, e.target.value)}
                        />
                    ))}
                </ul>
                <button onClick={store.addItem}>
                    Add New Item
                </button>
                <footer>
                <h2 className="completedTitle">Completed Items</h2>
                <ul>
                    {store.completedItems.map(item => (
                        <li key={item.id}>
                            {item.name}
                            {" tags: " + item.tags}
                        </li>
                    ))}
                </ul>
            </footer>
            </section>

        </div>
    )
}


function createTodoStore() {
    const self = observable({
        items: [{
            id: uuid(),
            name: "Sample item",
            tags: [],
            isDeleted: false,
            isComplete: false,
        }],

        get activeItems() {
            return self.items.filter(i => !i.isDeleted && !i.isComplete);
        },
        // get deletedItems() {
        //     return self.items.filter(i => i.isDeleted);
        // },
        get completedItems() {
            return self.items.filter(i => i.isComplete);
        },

        addItem() {
            self.items.push({
                id: uuid(),
                name: `Item ${self.items.length}`,
                tags: `${self.items.length}`,
            });
        },
        setItemName(id, name) {
            const item = self.items.find(i => i.id === id);
            item.name = name;
        },
        setItemTags(id, tags) {
            const item = self.items.find(i => i.id === id);
            item.tags = tags;
        },
        setDeleted(id) {
            const item = self.items.find(i => i.id === id);
            item.isDeleted = true;
        },
        setCompleted(id) {
            const item = self.items.find(i => i.id === id);
            item.isComplete = true;
        },
    })

    return self;
}


export default styled(observer(TodoList))`
    background-color: lightgray;

    .title {
        color: black;
    }
`
