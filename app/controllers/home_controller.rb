class HomeController < ApplicationController
  def index
  	#UserMailer.signupsuccess
  	#render :text=>'here2' and return
  	@vouchers = Voucher.limit(9)
  end

  def cater
  end


  def thanks
  end
end
