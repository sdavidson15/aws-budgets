package aws

import (
	"aws-budgets/backend/model"
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	awscostexplorer "github.com/aws/aws-sdk-go/service/costexplorer"
)

type costexplorerClient struct {
	client *awscostexplorer.CostExplorer
}

func newCostexplorerClient(session *session.Session, roleCreds *credentials.Credentials) *costexplorerClient {
	return &costexplorerClient{
		client: awscostexplorer.New(
			session,
			aws.NewConfig().WithCredentials(roleCreds).WithRegion(DEFAULT_REGION),
		),
	}
}

func (c *costexplorerClient) GetCostAndUsage(accountID string) ([]*awscostexplorer.ResultByTime, error) {
	// date formatting in Go is the worst
	t := time.Now()
	year, _, _ := t.Date()
	end := fmt.Sprintf("%s", t.Format(`2006-01-02`))
	end = fmt.Sprintf("%s01", end[:len(end)-2])
	start := fmt.Sprintf("%d%s", year-1, end[4:])

	input := &awscostexplorer.GetCostAndUsageInput{
		Granularity: model.MakeStringPointer(`MONTHLY`),
		Metrics:     []*string{model.MakeStringPointer(`UnblendedCost`)},
		TimePeriod: &awscostexplorer.DateInterval{
			End:   &end,
			Start: &start,
		},
	}

	resultsByTime := []*awscostexplorer.ResultByTime{}
	for {
		log.Printf("[INFO] AWS Costexplorer GetCostAndUsage for account: %s\n", accountID)
		output, err := c.client.GetCostAndUsage(input)
		if err != nil {
			return []*awscostexplorer.ResultByTime{}, err
		}

		resultsByTime = append(resultsByTime, output.ResultsByTime...)
		input.NextPageToken = output.NextPageToken
		if input.NextPageToken == nil {
			break
		}
	}

	return resultsByTime, nil
}
