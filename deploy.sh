# login to ECR
eval $(aws ecr get-login --no-include-email --region ap-southeast-2)
# build images
docker build -t 845778257277.dkr.ecr.ap-southeast-2.amazonaws.com/verbose-client:latest -t 845778257277.dkr.ecr.ap-southeast-2.amazonaws.com/verbose-client:$SHA -f ./Dockerfile ./

# push images
docker push 845778257277.dkr.ecr.ap-southeast-2.amazonaws.com/verbose-client:latest
docker push 845778257277.dkr.ecr.ap-southeast-2.amazonaws.com/verbose-client:$SHA

# update the tag
sed -i "s/TAG/$SHA/g" k8s/deployment.yaml

# apply new changes
kubectl apply -f k8s/deployment.yaml
