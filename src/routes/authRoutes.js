import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import PagesList from '../components/Pages/List'
import AddPage from '../components/Pages/Add'
import { AddFaq, EditFaq, FaqList } from '../components/Faqs'
import { AddFaqCategory, EditFaqCategory, FaqCategoryList } from '../components/Faqs/Categories'
import EditPage from '../components/Pages/Edit'
import MediaLibrary from '../components/MediaLibrary'

class AuthContent extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/faqs" component={FaqList} />
          <Route exact path="/dashboard/faqs/add" component={AddFaq} />
          <Route exact path="/dashboard/faqs/edit/:id" component={EditFaq} />
          <Route exact path="/dashboard/faqs/categories" component={FaqCategoryList} />
          <Route exact path="/dashboard/faqs/categories/add" component={AddFaqCategory} />
          <Route exact path="/dashboard/faqs/categories/edit/:id" component={EditFaqCategory} />
          <Route exact path="/dashboard/pages" component={PagesList} />
          <Route exact path="/dashboard/pages/add" component={AddPage} />
          <Route exact path="/dashboard/pages/edit/:id" component={EditPage} />
          <Route exact path="/dashboard/media" component={MediaLibrary} />
          <Route path="/" render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </Router>
    )
  }
}

export default AuthContent
