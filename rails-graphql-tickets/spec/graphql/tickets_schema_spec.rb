require 'rails_helper'

RSpec.describe TicketsSchema do
  it 'matches the dumped schema (rails graphql:schema:dump)' do
    aggregate_failures do
      expect(described_class.to_definition).to eq(
        File.read(Rails.root.join('export', 'graphql', 'schema.graphql'))
          .rstrip,
      )
      expect(described_class.to_json).to eq(
        File.read(Rails.root.join('export', 'graphql', 'schema.json')).rstrip,
      )
    end
  end
end