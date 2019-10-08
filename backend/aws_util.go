package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials/stscreds"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/budgets"
	"github.com/aws/aws-sdk-go/service/costexplorer"
)

type awsUtil struct {
	accountID        string
	region           string
	roleName         string
	budgetsUtil      *budgets.Budgets
	costExplorerUtil *costexplorer.CostExplorer
}

func (aws *awsUtil) getBudgets(accountID string) (Budgets, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return Budgets{}, err
	}

	bytes, err := ioutil.ReadFile(fmt.Sprintf(
		"%s%smockData%saccountbudgets%s%s.json",
		pwd,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		accountID,
	))
	if err != nil {
		return Budgets{}, err
	}

	time.Sleep(time.Millisecond * (time.Duration)(rand.Intn(750)+250))

	var budgets Budgets
	json.Unmarshal(bytes, &budgets)
	return budgets, nil
}

func (aws *awsUtil) getBudgetHistory(accountID, budgetName string) ([]BudgetHistoryItem, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return []BudgetHistoryItem{}, err
	}

	bytes, err := ioutil.ReadFile(fmt.Sprintf(
		"%s%smockData%sbudgetHistory%s%s_%s.json",
		pwd,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		accountID,
		budgetName,
	))
	if err != nil {
		return []BudgetHistoryItem{}, err
	}

	time.Sleep(time.Millisecond * (time.Duration)(rand.Intn(400)+100))

	var budgetHistory []BudgetHistoryItem
	json.Unmarshal(bytes, &budgetHistory)
	return budgetHistory, nil
}

// TODO: remove this
func newMockAwsUtil(accountID string, region string, roleName string) *awsUtil {
	return &awsUtil{
		accountID: accountID,
		region:    region,
		roleName:  roleName,
	}
}

func newAwsUtil(accountID string, region string, roleName string) *awsUtil {
	session := session.Must(session.NewSession())
	roleArn := fmt.Sprintf("arn:aws:iam::%s:role/%s", accountID, roleName)
	roleCreds := stscreds.NewCredentials(session, roleArn)

	return &awsUtil{
		accountID: accountID,
		region:    region,
		roleName:  roleName,
		budgetsUtil: budgets.New(
			session,
			aws.NewConfig().WithCredentials(roleCreds).WithRegion(region),
		),
		costExplorerUtil: costexplorer.New(
			session,
			aws.NewConfig().WithCredentials(roleCreds).WithRegion(region),
		),
	}
}
