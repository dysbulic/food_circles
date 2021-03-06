class StripePaymentsController < ApplicationController
  #Stripe Payments Controller for Test Envi.
  def new
  end

  def create
    # Amount in cents
    @amount = 500

    #tkxel_dev: create Customers and save them on stripe DB.
    customer = Stripe::Customer.create(
        :email => 'example@stripe.com',
        :card  => params[:stripeToken]
    )
    #tkxel_dev: Charges to be deducted handle here , Credit card info. validation also complete in this phase.
    charge = Stripe::Charge.create(
        :customer    => customer.id,
        :amount      => @amount,
        :description => 'Rails Stripe customer',
        :currency    => 'usd'
    )
    #tkxel_dev: Error messages in case of incorrect Credentilas
  rescue Stripe::CardError => e
    flash[:error] = e.message
    render :action => 'new'
  end

end
