require 'rails_helper'

RSpec.describe Ticket do
  let(:organization) { create(:organization) }
  let(:customer) { create(:customer, organizations: [organization]) }
  let(:receipt) { create(:receipt, customer: customer) }
  let(:production) { create(:production, organization: organization) }
  let(:performance) { create(:performance, production: production) }
  let(:ticket_type) { create(:ticket_type, production: production) }

  it 'has a production' do
    ticket =
      Ticket.create(
        receipt: receipt,
        performance: performance,
        ticket_type: ticket_type,
      )

    expect(ticket).to be_valid

    expect(receipt.tickets).to include(ticket)
    expect(ticket.receipt).to eq(receipt)
  end
end
