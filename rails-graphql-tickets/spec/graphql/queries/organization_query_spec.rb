describe GraphQL::Queries::OrganizationQuery do
  subject { described_class.new }

  it 'lists all organizations' do
    org = create(:organization)
    expect(subject.organizations).to include(org)
  end

  it 'selects one organization' do
    org = create(:organization)
    expect(subject.organization(id: org.id)).to eq(org)
  end
end
