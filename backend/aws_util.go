package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
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
	filePath, err := getBudgetsFilePath(accountID)
	if err != nil {
		return Budgets{}, err
	}

	bytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		time.Sleep(time.Second) // Give it a second
		bytes, err = ioutil.ReadFile(filePath)
		if err != nil {
			return Budgets{}, err
		}
	}

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

	var budgetHistory []BudgetHistoryItem
	json.Unmarshal(bytes, &budgetHistory)
	return budgetHistory, nil
}

func (aws *awsUtil) updateBudget(accountID, budgetName string, budgetAmount float64) error {
	budgets, err := aws.getBudgets(accountID)
	if err != nil {
		return err
	}

	madeChange := false
	for i, b := range budgets {
		if b.BudgetName != budgetName {
			continue
		} else if b.BudgetAmount == budgetAmount {
			break
		}

		budgets[i].BudgetAmount = budgetAmount
		madeChange = true
	}

	if madeChange {
		filePath, err := getBudgetsFilePath(accountID)
		if err != nil {
			return err
		}

		if err := os.Remove(filePath); err != nil {
			return err
		}

		if err := writeBudgetsFile(filePath, budgets); err != nil {
			return err
		}
	}
}

func writeBudgetsFile(filePath string, budgets Budgets) error {
	data, err := json.Marshal(budgets)
	if err != nil {
		return err
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	file.Close()

	return ioutil.WriteFile(filePath, data, 0644)
}

func getBudgetsFilePath(accountID string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	return fmt.Sprintf(
		"%s%smockData%saccountbudgets%s%s.json",
		pwd,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		PATH_SEPARATOR,
		accountID,
	)
}

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
