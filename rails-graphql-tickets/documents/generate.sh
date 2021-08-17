set -e
set -x

trap "exit" INT

bin/rails g model organization name:string
bin/rails g model user name:string email:string organization:references

bin/rails g model production title:string organization:references runtime_minutes:integer
bin/rails g model performance name:string production:references showtime_at:datetime doors_open_at:datetime

bin/rails g model customer name:string email:string
bin/rails g model customers_organizations customer:references organization:references

bin/rails g model receipt aasm_state:string customer:references

bin/rails g model ticket_type name:string price_in_cents:integer production:references
bin/rails g model ticket receipt:references performance:references ticket_type:references