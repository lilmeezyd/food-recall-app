/* eslint-disable no-undef */
describe('recalls', () => {
    it('user registration interaction', () => {
        // user can register
        cy.visit('localhost:3000/register')
        cy.findByPlaceholderText(/enter first name/i).type('David')
        cy.findByPlaceholderText(/enter last name/i).type('Beckham')
        cy.findByPlaceholderText(/enter email/i).type('denismoini09@gmail.com')
        cy.findByPlaceholderText(/enter password/i).type('abcdef')
        cy.findByPlaceholderText(/confirm password/i).type('abcdef')
        cy.findByRole("button", { name: /register/i}).click()
        cy.findByText(/User already exists!/i)
    })
    it('user login interaction and profile', () => {
        // user can login
        cy.visit('localhost:3000/login')
        cy.findByPlaceholderText(/enter email/i).type('denismoini09@gmail.com');
        cy.findByPlaceholderText(/enter password/i).type('123456')
        cy.findByRole("button", { name: /Login/i }).click()
        cy.findByRole("link", { name: /profile/i}).click()
        // user can edit personal details
        cy.findByLabelText(/first name/i).clear()
        cy.findByLabelText(/last name/i).clear()
        cy.get("#details").click()
        cy.findByText(/please enter all fields/i)
        // user can change password
        cy.findByPlaceholderText(/enter old password/i).type('1234')
        cy.findByPlaceholderText(/enter new password/i).type('abcdefg')
        cy.findByPlaceholderText(/confirm new password/i).type('abcdefg')
        cy.get("#password").click()
        cy.findByText(/Old password not correct!/i)
        // user can change recalls provider
        cy.wait(3000)
        cy.get('[type="checkbox"]').uncheck()
        cy.wait(3000)
        cy.get('[type="checkbox"]').check()
        cy.get("#notice").click()
        cy.findByText(/notifications updated!/i)
        cy.wait(2000)
    })
   it('user can view fda recalls and interact', () => {
        // user can view recalls
        cy.visit('localhost:3000/recalls/fda')
        //cy.findByText(/loading.../i)
        cy.wait(20000)
        // user can search recalls
        cy.findByPlaceholderText(/type in keyword/i).type('pineapple')
        cy.wait(3000)
        cy.findByRole("button", { name: /reset/i}).click()
        cy.findByPlaceholderText(/type in keyword/i).type('i am extra!')
        cy.findByText(/no recalls found/i)
        cy.wait(3000)
        cy.findByRole("button", { name: /reset/i}).click()     
        // user can filter recalls
        cy.get('#states').click()
        cy.get('[type="checkbox"]').check('Alabama')
        cy.wait(3000)
        cy.findByRole("button", { name: /reset/i}).click() 

        cy.get('#year').click()
        cy.get('[type="checkbox"]').check('2024')
        cy.get('.recall-list')
        cy.wait(3000)
        cy.findByRole("button", { name: /reset/i}).click()
        cy.get('#year').click()

        cy.get('.chart-view').click()
        cy.wait(3000)
        cy.get('select#jump1').select('2010')
        cy.wait(3000)
        cy.get('select#jump2').select('2010')
        cy.wait(3000)
        
    })
    it('user can view usda recalls and interact', () => {
        // user can view recalls
        cy.visit('localhost:3000/recalls/usda')
        cy.wait(40000)
        // user can search recalls
        cy.findByPlaceholderText(/type in keyword/i).type('chicken')
        cy.wait(3000)
        cy.findByRole("button", { name: /reset/i}).click()
        cy.findByPlaceholderText(/type in keyword/i).type('i am extra!')
        cy.findByText(/no recalls found/i)
        cy.wait(3000)
        cy.findByRole("button", { name: /reset/i}).click()     
        // user can filter recalls
        cy.get('#states').click()
        cy.get('[type="checkbox"]').check('Alabama')
        cy.wait(3000)
        cy.findByRole("button", { name: /reset/i}).click() 

        cy.get('#year').click()
        cy.get('[type="checkbox"]').check('2024')
        cy.get('.recall-list')
        cy.wait(3000)
        cy.findByRole("button", { name: /reset/i}).click()
        cy.get('#year').click()

        cy.get('.chart-view').click()
        cy.wait(3000)
        cy.get('select#jump1').select('2016')
        cy.wait(3000)
        cy.get('select#jump2').select('2015')
        cy.wait(3000)
    })
})