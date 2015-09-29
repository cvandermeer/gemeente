require 'test_helper'

class ReportTest < ActiveSupport::TestCase
  setup :initialize_report

  def teardown
    @report = nil
  end

  test 'should not create report without any input' do
    report = Report.new
    assert_not report.save, 'Saved an report without any input!'
  end

  test 'should not create report without title' do
    report = Report.new(description: @report.description,
                        street: @report.street,
                        housenumber: @report.housenumber,
                        town: @report.town,
                        start_date: @report.start_date)
    assert_not report.save, 'Saved an report without title!'
  end

  test 'should not create report without description' do
    report = Report.new(title: @report.title,
                        street: @report.street,
                        housenumber: @report.housenumber,
                        town: @report.town,
                        start_date: @report.start_date)
    assert_not report.save, 'Saved an report without description!'
  end

  test 'should not create report without street' do
    report = Report.new(title: @report.title,
                        description: @report.description,
                        housenumber: @report.housenumber,
                        town: @report.town,
                        start_date: @report.start_date)
    assert_not report.save, 'Saved an report without street!'
  end

  test 'should not create report without housenumber' do
    report = Report.new(title: @report.title,
                        description: @report.description,
                        street: @report.street,
                        town: @report.town,
                        start_date: @report.start_date)
    assert_not report.save, 'Saved an report without housenumber!'
  end

  test 'should not create report without town' do
    report = Report.new(title: @report.title,
                        description: @report.description,
                        street: @report.street,
                        housenumber: @report.housenumber,
                        start_date: @report.start_date)
    assert_not report.save, 'Saved an report without town!'
  end

  test 'should not create report without start_date' do
    report = Report.new(title: @report.title,
                        description: @report.description,
                        street: @report.street,
                        housenumber: @report.housenumber,
                        town: @report.town)
    assert_not report.save, 'Saved an report without start_date!'
  end

  private

  def initialize_report
    @report = reports(:report1)
  end
end
