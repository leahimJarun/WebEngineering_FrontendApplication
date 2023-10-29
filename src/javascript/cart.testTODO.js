describe('renderCartItems function', () => {
    it('should render cart items correctly', () => {
        //create a mock cart with sample data
        const cart = {
            'item1': {
                title: 'Item 1',
                price: 9.99,
                qty: 2,
            },
            'item2': {
                title: 'Item 2',
                price: 14.99,
                qty: 1,
            },
        };

        //mock document
        let doc = new Document();

        //create a mock
        const tbody = doc.createElement('tbody');

        function renderCartItems(cart, tbody) {
            for (let id in cart) {
                const item = cart[id];

                let tr = doc.createElement('tr');

                let title_td = doc.createElement('td');
                title_td.textContent = item.title;
                tr.appendChild(title_td);

                let price_td = doc.createElement('td');
                price_td.textContent = item.price;
                tr.appendChild(price_td);

                let qty_td = doc.createElement('td');
                qty_td.textContent = item.qty;
                tr.appendChild(qty_td);

                tbody.appendChild(tr);
            }
        }

        renderCartItems(cart, tbody);

        expect(tbody.children.length).toBe(Object.keys(cart).length);

        const rows = tbody.children;
        for (let id in cart) {
            const item = cart[id];
            const row = Array.from(rows).find(row => row.textContent.includes(item.title));
            expect(row).toBeDefined();
            expect(row.querySelector('td:nth-child(1)').textContent).toBe(item.title);
            expect(row.querySelector('td:nth-child(2)').textContent).toBe(item.price.toString());
            expect(row.querySelector('td:nth-child(3)').textContent).toBe(item.qty.toString());
        }
    });
});